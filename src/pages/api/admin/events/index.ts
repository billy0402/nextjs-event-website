import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { validationGuard } from '@/helpers/api-guard';
import { withAdminGuard, withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { EventOut } from '@/schema/event';
import { EventInSchema, EventOutSchema } from '@/schema/event';

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
    case 'POST': {
      const data = validationGuard(EventInSchema, req, res);
      if (!data) return;

      const event = await prisma.event.create({ data });
      const response = EventOutSchema.parse(event);
      return res.status(201).json(response);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(withAdminGuard(handler));
