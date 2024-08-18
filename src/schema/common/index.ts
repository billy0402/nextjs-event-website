import { z } from 'zod';

const isValidObjectId = (id: string) => /^[a-fA-F0-9]{24}$/.test(id);
export const ObjectIdSchema = z.string().refine(isValidObjectId);

export const RequiredStringSchema = z.string().min(1);

export const BooleanSchema = z.preprocess((val) => {
  if (typeof val === 'string') {
    if (val === '' || val.toLowerCase() === 'true') return true;
    if (val.toLowerCase() === 'false') return false;
  }
  return val;
}, z.boolean());

export const CommonSchema = z.object({
  id: ObjectIdSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Common = z.infer<typeof CommonSchema>;

export const PaginationMetaSchema = z.object({
  count: z.number(),
  page: z.number(),
  limit: z.number(),
  first: z.number(),
  last: z.number(),
});
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export function createPaginationMetaSchema<T extends z.ZodType>(schema: T) {
  return z.object({
    data: z.array(schema),
    meta: PaginationMetaSchema,
  });
}
