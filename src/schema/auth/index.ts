import { Role } from '@prisma/client';
import { z } from 'zod';

// Login
export const LoginInSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6),
});
export type LoginIn = z.infer<typeof LoginInSchema>;

export const TokenPayloadSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});
export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

// Refresh
export const RefreshInSchema = z.object({
  refreshToken: z.string().min(1),
});
export type RefreshIn = z.infer<typeof RefreshInSchema>;

// Me
export const UserInfoSchema = z.object({
  id: z.string().min(1),
  email: z.string().email().min(1),
  name: z.string().min(1),
  role: z.nativeEnum(Role),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type UserInfo = z.infer<typeof UserInfoSchema>;

// Register
export const RegisterInSchema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    name: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  })
  .transform(({ confirmPassword, ...data }) => data);
export type RegisterIn = z.infer<typeof RegisterInSchema>;
