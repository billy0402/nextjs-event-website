import { Role } from '@prisma/client';
import { z } from 'zod';

export const EventReservationOutSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().nullish().default(null),
  startDateTime: z.date(),
  endDateTime: z.date(),
  location: z.string().nullish().default(null),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  reservations: z
    .object({
      id: z.string().min(1),
      user: z.object({
        id: z.string().min(1),
        email: z.string().min(1).email(),
        name: z.string().min(1),
        role: z.nativeEnum(Role),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    })
    .array(),
});
export type EventReservationOut = z.infer<typeof EventReservationOutSchema>;
