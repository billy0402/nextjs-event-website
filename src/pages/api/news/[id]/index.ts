import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { NewsOut } from '@/schema/news';
import { NewsOutSchema } from '@/schema/news';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsOut | ApiError>,
) {
  const { id } = req.query as { id: string };

  switch (req.method) {
    case 'GET': {
      const news = await prisma.news.findUnique({
        where: { id, publishedAt: { lte: new Date() }, isActive: true },
      });
      if (!news) {
        return res.status(404).json({ message: 'News not found' });
      }

      const updatedNews = await prisma.news.update({
        data: { views: { increment: 1 } },
        where: { id },
      });
      const response = NewsOutSchema.parse(updatedNews);
      return res.status(200).json(response);
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
