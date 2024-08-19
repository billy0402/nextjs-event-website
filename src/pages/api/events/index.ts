import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { EventOut } from '@/schema/event';
import { EventOutSchema } from '@/schema/event';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventOut[] | EventOut | ApiError>,
) {
  switch (req.method) {
    case 'GET': {
      const events = await prisma.event.findMany();
      const response = EventOutSchema.array().parse(events);
      return res.status(200).json(response);
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
