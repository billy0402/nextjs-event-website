import { z } from 'zod';

import { UserInfoSchema } from '@/schema/auth';
import { ObjectIdSchema } from '@/schema/common';
import { EventOutSchema } from '@/schema/event';

export const ReservationInSchema = z.object({
  eventId: ObjectIdSchema,
});
export type ReservationIn = z.infer<typeof ReservationInSchema>;

export const ReservationOutSchema = z.object({
  id: ObjectIdSchema,
  event: EventOutSchema,
  user: UserInfoSchema,
});
export type ReservationOut = z.infer<typeof ReservationOutSchema>;
