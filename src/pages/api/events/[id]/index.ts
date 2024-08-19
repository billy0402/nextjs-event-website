import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { EventOut } from '@/schema/event';
import { EventOutSchema } from '@/schema/event';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventOut | ApiError>,
) {
  const { id } = req.query as { id: string };

  switch (req.method) {
    case 'GET': {
      const event = await prisma.event.findUnique({
        where: { id, isActive: true },
      });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const response = EventOutSchema.parse(event);
      return res.status(200).json(response);
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
