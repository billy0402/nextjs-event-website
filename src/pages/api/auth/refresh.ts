import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';

import env from '@/fixtures/env';
import { validationGuard } from '@/helpers/api-guard';
import { withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { TokenPayload } from '@/schema/auth';
import { RefreshInSchema, TokenPayloadSchema } from '@/schema/auth';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenPayload | ApiError>,
) {
  switch (req.method) {
    case 'POST': {
      const data = validationGuard(RefreshInSchema, req, res);
      if (!data) return;
      const { refreshToken } = data;

      let tokenData: jwt.JwtPayload;
      try {
        tokenData = jwt.verify(
          refreshToken,
          env.REFRESH_TOKEN_SECRET,
        ) as jwt.JwtPayload;
      } catch (error) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }

      if (tokenData.exp && new Date(tokenData.exp * 1000) < new Date()) {
        return res
          .status(401)
          .json({ message: 'Invalid or expired refresh token' });
      }

      const newAccessToken = jwt.sign(
        { userId: tokenData.userId },
        env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: env.ACCESS_TOKEN_LIFETIME },
      );
      const newRefreshToken = jwt.sign(
        { userId: tokenData.userId },
        env.REFRESH_TOKEN_SECRET,
        { expiresIn: env.REFRESH_TOKEN_LIFETIME },
      );

      const response = TokenPayloadSchema.parse({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
      return res.status(200).json(response);
    }
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
