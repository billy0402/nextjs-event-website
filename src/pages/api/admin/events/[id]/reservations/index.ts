import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { withAdminGuard, withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { EventReservationOut } from '@/schema/event-reservation';
import { EventReservationOutSchema } from '@/schema/event-reservation';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventReservationOut | ApiError>,
) {
  const { id } = req.query as { id: string };

  switch (req.method) {
    case 'GET': {
      const event = await prisma.event.findUnique({ where: { id } });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const eventReservations = await prisma.event.findUnique({
        include: {
          reservations: {
            include: {
              user: true,
            },
          },
        },
        where: { id },
      });
      const response = EventReservationOutSchema.parse(eventReservations);
      return res.status(200).json(response);
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(withAdminGuard(handler));
