import type { NextApiRequest, NextApiResponse } from 'next';

import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import prisma from '@/db';
import env from '@/fixtures/env';
import { validationGuard } from '@/helpers/api-guard';
import { withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { TokenPayload } from '@/schema/auth';
import { LoginInSchema, TokenPayloadSchema } from '@/schema/auth';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenPayload | ApiError>,
) {
  switch (req.method) {
    case 'POST': {
      const data = validationGuard(LoginInSchema, req, res);
      if (!data) return undefined;
      const { email, password } = data;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const accessToken = jwt.sign(
        { userId: user.id },
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: env.ACCESS_TOKEN_LIFETIME },
      );
      const refreshToken = jwt.sign(
        { userId: user.id },
        env.REFRESH_TOKEN_SECRET,
        { expiresIn: env.REFRESH_TOKEN_LIFETIME },
      );

      const response = TokenPayloadSchema.parse({ accessToken, refreshToken });
      return res.status(200).json(response);
    }
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
