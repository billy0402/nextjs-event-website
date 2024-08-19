import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';
import type { ZodType, z } from 'zod';

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
