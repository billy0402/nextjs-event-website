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
