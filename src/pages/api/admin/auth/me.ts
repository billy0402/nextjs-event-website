import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/db';
import { authGuard } from '@/helpers/api-guard';
import { withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { UserInfo } from '@/schema/auth';
import { UserInfoSchema } from '@/schema/auth';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInfo | ApiError>,
) {
  switch (req.method) {
    case 'GET': {
      const token = authGuard(req, res);
      if (!token) return undefined;

      const user = await prisma.user.findUnique({
        where: { id: token.userId },
      });
      const response = UserInfoSchema.parse(user);
      return res.status(200).json(response);
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
