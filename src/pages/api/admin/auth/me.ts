import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';

import prisma from '@/db';
import env from '@/fixtures/env';
import { withAdminGuard, withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { UserInfo } from '@/schema/auth';
import { UserInfoSchema } from '@/schema/auth';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInfo | ApiError>,
) {
  switch (req.method) {
    case 'GET': {
      const token = req.headers.authorization!.replace('Bearer ', '');
      const tokenData = jwt.verify(
        token,
        env.ACCESS_TOKEN_SECRET,
      ) as jwt.JwtPayload;

      const user = await prisma.user.findUnique({
        where: { id: tokenData.userId },
      });
      const response = UserInfoSchema.parse(user);
      return res.status(200).json(response);
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(withAdminGuard(handler));
