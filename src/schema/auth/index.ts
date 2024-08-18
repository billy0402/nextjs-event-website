import { Role } from '@prisma/client';
import { z } from 'zod';

import {
  CommonSchema,
  ObjectIdSchema,
  RequiredStringSchema,
} from '@/schema/common';

// Login
export const LoginInSchema = z.object({
  email: RequiredStringSchema.email(),
  password: RequiredStringSchema.min(6),
});
export type LoginIn = z.infer<typeof LoginInSchema>;

export const TokenUserDataSchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(Role),
});
export type TokenUserData = z.infer<typeof TokenUserDataSchema>;
export const TokenDataSchema = TokenUserDataSchema.extend({
  iat: z.number(),
  exp: z.number(),
});
export type TokenData = z.infer<typeof TokenDataSchema>;

export const TokenPayloadSchema = z.object({
  accessToken: RequiredStringSchema,
  refreshToken: RequiredStringSchema,
});
export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

// Refresh
export const RefreshInSchema = z.object({
  refreshToken: RequiredStringSchema,
});
export type RefreshIn = z.infer<typeof RefreshInSchema>;

// Me
export const UserInfoSchema = z
  .object({
    email: RequiredStringSchema.email(),
    name: RequiredStringSchema,
    role: z.nativeEnum(Role),
  })
  .merge(CommonSchema);
export type UserInfo = z.infer<typeof UserInfoSchema>;

// Register
export const RegisterInSchema = z
  .object({
    email: RequiredStringSchema.email(),
    password: RequiredStringSchema.min(6),
    confirmPassword: RequiredStringSchema.min(6),
    name: RequiredStringSchema,
    role: z.nativeEnum(Role).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  })
  .transform(({ confirmPassword, ...data }) => data);
export type RegisterIn = z.infer<typeof RegisterInSchema>;
