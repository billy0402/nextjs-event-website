import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { NewsOut } from '@/schema/news';
import { NewsOutSchema } from '@/schema/news';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsOut[] | NewsOut | ApiError>,
) {
  switch (req.method) {
    case 'GET': {
      const newsList = await prisma.news.findMany();
      const response = NewsOutSchema.array().parse(newsList);
      return res.status(200).json(response);
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
