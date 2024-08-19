import type { NextApiRequest, NextApiResponse } from 'next';

import { Role } from '@prisma/client';

import prisma from '@/db';
import { authGuard, validationGuard } from '@/helpers/api-guard';
import { withServerError } from '@/helpers/handler-wrapper';
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
      if (!tokenData) return;

      const { eventId } = req.query as { eventId?: string };

      const reservations = await prisma.reservation.findMany({
        include: { event: true, user: true },
        where:
          eventId && tokenData.role === Role.ADMIN
            ? { eventId }
            : { userId: tokenData.userId },
      });
      const response = ReservationOutSchema.array().parse(reservations);
      return res.status(200).json(response);
    }
    case 'POST': {
      const tokenData = authGuard(req, res);
      if (!tokenData) return;

      const data = validationGuard(ReservationInSchema, req, res);
      if (!data) return;
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
        include: { event: true, user: true },
      });
      const response = ReservationOutSchema.parse(createdReservation);
      return res.status(201).json(response);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
