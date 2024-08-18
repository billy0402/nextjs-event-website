import { z } from 'zod';

const ENVSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_LIFETIME: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_LIFETIME: z.string(),
});

export default ENVSchema.parse(process.env);
