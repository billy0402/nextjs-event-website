import type { EventIn, EventOut } from '@/schema/event';
import instance from '@/services/instance';

export async function apiEventList() {
  const response = await instance.get<EventOut[]>('/events');
  return response.data;
}

export async function apiEventRetrieve(id: string) {
  const response = await instance.get<EventOut>(`/events/${id}`);
  return response.data;
}

export async function apiEventCreate(data: EventIn) {
  const response = await instance.post<EventOut>('/events', data);
  return response.data;
}

export async function apiEventUpdate(id: string, data: EventIn) {
  const response = await instance.put<EventOut>(`/events/${id}`, data);
  return response.data;
}

export async function apiEventPartUpdate(id: string, data: Partial<EventIn>) {
  const response = await instance.patch<EventOut>(`/events/${id}`, data);
  return response.data;
}

export async function apiEventDestroy(id: string) {
  const response = await instance.delete<null>(`/events/${id}`);
  return response.data;
}
