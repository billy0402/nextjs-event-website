import { z } from 'zod';

export const EventInSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullish().default(null),
  date: z.string().datetime(),
  location: z.string().nullish().default(null),
  isActive: z.boolean().or(z.string().transform((value) => value === 'true')),
});
export type EventIn = z.infer<typeof EventInSchema>;

export const EventOutSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().nullish().default(null),
  date: z.date(),
  location: z.string().nullish().default(null),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type EventOut = z.infer<typeof EventOutSchema>;
