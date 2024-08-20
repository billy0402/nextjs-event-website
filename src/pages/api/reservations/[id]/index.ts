import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

import { authGuard } from '@/helpers/api-guard';
import { withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { ReservationOut } from '@/schema/reservation';
import { ReservationOutSchema } from '@/schema/reservation';

const prisma = new PrismaClient();

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReservationOut | ApiError>,
) {
  const { id } = req.query as { id: string };

  switch (req.method) {
    case 'GET': {
      const tokenData = authGuard(req, res);
      if (!tokenData) return;

      const reservation = await prisma.reservation.findUnique({
        include: { event: true, user: true },
        where: { id, userId: tokenData.userId },
      });
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      const response = ReservationOutSchema.parse(reservation);
      return res.status(200).json(response);
    }
    case 'DELETE': {
      const tokenData = authGuard(req, res);
      if (!tokenData) return;

      const reservation = await prisma.reservation.findUnique({
        where: { id, userId: tokenData.userId },
      });
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      await prisma.reservation.delete({ where: { id } });
      return res.status(204).end();
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
