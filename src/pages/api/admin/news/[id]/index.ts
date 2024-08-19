import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { validationGuard } from '@/helpers/api-guard';
import { withAdminGuard, withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { NewsOut } from '@/schema/news';
import { NewsInSchema, NewsOutSchema } from '@/schema/news';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsOut | ApiError>,
) {
  const { id } = req.query as { id: string };

  switch (req.method) {
    case 'GET': {
      const news = await prisma.news.findUnique({ where: { id } });
      if (!news) {
        return res.status(404).json({ message: 'News not found' });
      }

      const response = NewsOutSchema.parse(news);
      return res.status(200).json(response);
    }
    case 'PUT':
    case 'PATCH': {
      const Schema =
        req.method === 'PUT' ? NewsInSchema : NewsInSchema.partial();
      const data = validationGuard(Schema, req, res);
      if (!data) return;

      const news = await prisma.news.findUnique({ where: { id } });
      if (!news) {
        return res.status(404).json({ message: 'News not found' });
      }

      const updatedNews = await prisma.news.update({
        data,
        where: { id },
      });
      const response = NewsOutSchema.parse(updatedNews);
      return res.status(200).json(response);
    }
    case 'DELETE': {
      const news = await prisma.news.findUnique({ where: { id } });
      if (!news) {
        return res.status(404).json({ message: 'News not found' });
      }

      await prisma.news.delete({ where: { id } });
      return res.status(204).end();
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(withAdminGuard(handler));
