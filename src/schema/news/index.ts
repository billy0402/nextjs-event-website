import { z } from 'zod';

export const NewsInSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  image: z.string().url().nullish().or(z.literal('')),
  fbLink: z.string().url().nullish().or(z.literal('')),
  publishedAt: z.string().datetime(),
  isActive: z.boolean().or(z.string().transform((value) => value === 'true')),
});
export type NewsIn = z.infer<typeof NewsInSchema>;

export const NewsOutSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  image: z.string().url().nullish().or(z.literal('')),
  fbLink: z.string().url().nullish().or(z.literal('')),
  views: z.number(),
  publishedAt: z.date(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type NewsOut = z.infer<typeof NewsOutSchema>;
