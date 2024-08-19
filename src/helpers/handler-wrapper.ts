import util from 'util';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';

import prisma from '@/db';
import env from '@/fixtures/env';
import { Role } from '@prisma/client';

export function withServerError(handler: NextApiHandler): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error(
        'API Error:',
        util.inspect(error, { breakLength: Infinity }),
      );
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

export function withAdminGuard(handler: NextApiHandler): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    let tokenData: jwt.JwtPayload;
    try {
      tokenData = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: tokenData.userId },
    });
    if (user?.role !== Role.ADMIN) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    return await handler(req, res);
  };
}
