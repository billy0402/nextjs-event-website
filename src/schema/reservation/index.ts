import { Role } from '@prisma/client';
import { z } from 'zod';

export const ReservationInSchema = z.object({
  eventId: z.string().min(1),
});
export type ReservationIn = z.infer<typeof ReservationInSchema>;

export const ReservationOutSchema = z.object({
  id: z.string().min(1),
  event: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().nullish().default(null),
    startDateTime: z.date(),
    endDateTime: z.date(),
    location: z.string().nullish().default(null),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  user: z.object({
    id: z.string().min(1),
    email: z.string().email().min(1),
    name: z.string().min(1),
    role: z.nativeEnum(Role),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});
export type ReservationOut = z.infer<typeof ReservationOutSchema>;
