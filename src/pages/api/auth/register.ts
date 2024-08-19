import type { NextApiRequest, NextApiResponse } from 'next';

import { hash } from 'bcryptjs';

import prisma from '@/db';
import { validationGuard } from '@/helpers/api-guard';
import { withServerError } from '@/helpers/handler-wrapper';
import type { ApiError } from '@/models/error';
import type { UserInfo } from '@/schema/auth';
import { RegisterInSchema, UserInfoSchema } from '@/schema/auth';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInfo | ApiError>,
) {
  switch (req.method) {
    case 'POST': {
      const data = validationGuard(RegisterInSchema, req, res);
      if (!data) return;
      const { email, password } = data;

      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const hashedPassword = await hash(password, 10);
      const newUser = await prisma.user.create({
        data: { ...data, password: hashedPassword },
      });
      const response = UserInfoSchema.parse(newUser);
      return res.status(201).json(response);
    }
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withServerError(handler);
