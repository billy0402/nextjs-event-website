import type { z } from 'zod';

import { EventOutSchema } from '@/schema/event';
import { ReservationOutSchema } from '@/schema/reservation';

export const EventReservationOutSchema = EventOutSchema.extend({
  reservations: ReservationOutSchema.omit({ event: true }).array(),
});
export type EventReservationOut = z.infer<typeof EventReservationOutSchema>;
