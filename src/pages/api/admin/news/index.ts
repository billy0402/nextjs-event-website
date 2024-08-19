import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { validationGuard } from '@/helpers/api-guard';
import { withAdminGuard, withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { NewsOut } from '@/schema/news';
import { NewsInSchema, NewsOutSchema } from '@/schema/news';

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
    case 'POST': {
      const data = validationGuard(NewsInSchema, req, res);
      if (!data) return;

      const news = await prisma.news.create({ data });
      const response = NewsOutSchema.parse(news);
      return res.status(201).json(response);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(withAdminGuard(handler));
