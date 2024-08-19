import type { NextApiRequest, NextApiResponse } from 'next';

import type { Role, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import type { ZodType, z } from 'zod';

import prisma from '@/db';
import env from '@/fixtures/env';

export function authGuard(
  req: NextApiRequest,
  res: NextApiResponse,
): jwt.JwtPayload | false {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return false;
  }

  try {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return false;
  }
}

export async function roleGuard(
  role: Role,
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<User | false> {
  const tokenData = authGuard(req, res);
  if (!tokenData) return false;

  const user = await prisma.user.findUnique({
    where: { id: tokenData.userId },
  });

  if (user?.role !== role) {
    res.status(403).json({ message: 'Forbidden' });
    return false;
  }

  return user;
}

export function validationGuard<T extends ZodType>(
  schema: T,
  req: NextApiRequest,
  res: NextApiResponse,
): z.infer<T> | false {
  const { success, data, error } = schema.safeParse(req.body);

  if (!success) {
    res.status(400).json({ message: 'Bad Request', details: error.issues });
    return false;
  }

  return data;
}
