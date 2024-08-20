import type { EventOut } from '@/schema/event';
import instance from '@/services/instance';

export async function apiEventList() {
  const response = await instance.get<EventOut[]>('/events');
  return response.data;
}

export async function apiEventRetrieve(id: string) {
  const response = await instance.get<EventOut>(`/events/${id}`);
  return response.data;
}
