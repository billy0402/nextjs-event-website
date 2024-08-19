import { z } from 'zod';

import {
  BooleanSchema,
  CommonSchema,
  RequiredStringSchema,
} from '@/schema/common';

export const NewsInSchema = z.object({
  title: RequiredStringSchema,
  content: RequiredStringSchema,
  image: z.string().url().nullish().or(z.literal('')),
  fbLink: z.string().url().nullish().or(z.literal('')),
  publishedAt: z.string().datetime(),
  isActive: BooleanSchema.optional(),
});
export type NewsIn = z.infer<typeof NewsInSchema>;

export const NewsOutSchema = NewsInSchema.merge(CommonSchema).extend({
  views: z.number(),
  publishedAt: z.date(),
});
export type NewsOut = z.infer<typeof NewsOutSchema>;
