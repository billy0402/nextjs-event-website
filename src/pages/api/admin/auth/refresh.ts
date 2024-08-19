import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';

import env from '@/fixtures/env';
import { validationGuard } from '@/helpers/api-guard';
import withServerError from '@/helpers/error-handler';
import type { ApiError } from '@/models/error';
import type { TokenData, TokenPayload } from '@/schema/auth';
import {
  RefreshInSchema,
  TokenDataSchema,
  TokenPayloadSchema,
  TokenUserDataSchema,
} from '@/schema/auth';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenPayload | ApiError>,
) {
  switch (req.method) {
    case 'POST': {
      const data = validationGuard(RefreshInSchema, req, res);
      if (!data) return undefined;
      const { refreshToken } = data;

      let tokenData: TokenData;
      try {
        tokenData = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET) as any;
        tokenData = TokenDataSchema.parse(tokenData);
      } catch (error) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }

      if (new Date(tokenData.exp * 1000) < new Date()) {
        return res
          .status(401)
          .json({ message: 'Invalid or expired refresh token' });
      }

      const tokenUserData = TokenUserDataSchema.parse(tokenData);
      const newAccessToken = jwt.sign(
        tokenUserData,
        env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: env.ACCESS_TOKEN_LIFETIME },
      );
      const newRefreshToken = jwt.sign(
        tokenUserData,
        env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: env.REFRESH_TOKEN_LIFETIME,
        },
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
