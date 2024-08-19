import type { NextApiRequest, NextApiResponse } from 'next';

import { Role } from '@prisma/client';

import prisma from '@/db';
import { roleGuard, validationGuard } from '@/helpers/api-guard';
import withServerError from '@/helpers/error-handler';
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

      const updatedNews = await prisma.news.update({
        data: { views: { increment: 1 } },
        where: { id },
      });
      const response = NewsOutSchema.parse(updatedNews);
      return res.status(200).json(response);
    }
    case 'PUT':
    case 'PATCH': {
      if (!roleGuard(Role.ADMIN, req, res)) return undefined;

      const schema =
        req.method === 'PUT' ? NewsInSchema : NewsInSchema.partial();
      const data = validationGuard(schema, req, res);
      if (!data) return undefined;

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
      if (!roleGuard(Role.ADMIN, req, res)) return undefined;

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

export default withServerError(handler);
