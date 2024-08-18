import type { NextApiRequest, NextApiResponse } from 'next';

import { z } from 'zod';

import { Role } from '@prisma/client';

import prisma from '@/db';
import { authGuard, validationGuard } from '@/helpers/api-guard';
import withServerError from '@/helpers/error-handler';
import type { ApiError } from '@/models/error';
import type { ReservationOut } from '@/schema/reservation';
import {
  ReservationInSchema,
  ReservationOutSchema,
} from '@/schema/reservation';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReservationOut[] | ReservationOut | ApiError>,
) {
  switch (req.method) {
    case 'GET': {
      const tokenData = authGuard(req, res);
      if (!tokenData) return undefined;

      const { eventId } = req.query as { eventId?: string };

      const reservations = await prisma.reservation.findMany({
        include: { event: true, user: true },
        where:
          eventId && tokenData.role === Role.ADMIN
            ? { eventId }
            : { userId: tokenData.userId },
      });
      const response = z.array(ReservationOutSchema).parse(reservations);
      return res.status(200).json(response);
    }
    case 'POST': {
      const tokenData = authGuard(req, res);
      if (!tokenData) return undefined;

      const data = validationGuard(ReservationInSchema, req, res);
      if (!data) return undefined;
      const { eventId } = data;

      const event = await prisma.event.findUnique({ where: { id: eventId } });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const reservation = await prisma.reservation.findFirst({
        where: { userId: tokenData.userId, eventId },
      });
      if (reservation) {
        return res.status(400).json({ message: 'Already reserved' });
      }

      const createdReservation = await prisma.reservation.create({
        data: { userId: tokenData.userId, eventId },
        include: { event: true },
      });
      const response = ReservationOutSchema.parse(createdReservation);
      return res.status(201).json(response);
    }
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
