import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { validationGuard } from '@/helpers/api-guard';
import { withAdminGuard, withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { EventOut } from '@/schema/event';
import { EventInSchema, EventOutSchema } from '@/schema/event';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventOut | ApiError>,
) {
  const { id } = req.query as { id: string };

  switch (req.method) {
    case 'GET': {
      const event = await prisma.event.findUnique({ where: { id } });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const response = EventOutSchema.parse(event);
      return res.status(200).json(response);
    }
    case 'PUT': {
      const data = validationGuard(EventInSchema, req, res);
      if (!data) return;

      const event = await prisma.event.findUnique({ where: { id } });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const updatedEvent = await prisma.event.update({
        data,
        where: { id },
      });
      const response = EventOutSchema.parse(updatedEvent);
      return res.status(200).json(response);
    }
    case 'DELETE': {
      const reservations = await prisma.reservation.findMany({
        where: { eventId: id },
      });
      if (reservations.length > 0) {
        return res.status(400).json({
          message: 'Cannot delete event with existing reservations',
        });
      }

      const event = await prisma.event.findUnique({ where: { id } });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      await prisma.event.delete({ where: { id } });
      return res.status(204).end();
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(withAdminGuard(handler));
