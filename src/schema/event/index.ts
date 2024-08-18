import { z } from 'zod';

import {
  BooleanSchema,
  CommonSchema,
  RequiredStringSchema,
} from '@/schema/common';

export const EventInSchema = z.object({
  title: RequiredStringSchema,
  description: z.string().optional().nullable(),
  date: z.string().datetime(),
  location: z.string().optional().nullable(),
  isActive: BooleanSchema.optional(),
});
export type EventIn = z.infer<typeof EventInSchema>;

export const EventOutSchema = EventInSchema.merge(CommonSchema).extend({
  date: z.date(),
});
export type EventOut = z.infer<typeof EventOutSchema>;
