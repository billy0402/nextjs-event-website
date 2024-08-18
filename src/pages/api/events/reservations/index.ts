import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { roleGuard } from '@/helpers/api-guard';
import withServerError from '@/helpers/error-handler';
import type { ApiError } from '@/models/error';
import type { EventReservationOut } from '@/schema/event-reservation';
import { EventReservationOutSchema } from '@/schema/event-reservation';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventReservationOut[] | ApiError>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  switch (req.method) {
    case 'GET': {
      if (!roleGuard('ADMIN', req, res)) return undefined;

      const events = await prisma.event.findMany({
        include: {
          reservations: {
            include: {
              user: true,
            },
          },
        },
      });
      const response = EventReservationOutSchema.array().parse(events);
      return res.status(200).json(response);
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
