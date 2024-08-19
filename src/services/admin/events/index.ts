import type { EventIn, EventOut } from '@/schema/event';
import { EventReservationOut } from '@/schema/event-reservation';
import instance from '@/services/instance';

export async function apiAdminEventList() {
  const response = await instance.get<EventOut[]>('/admin/events');
  return response.data;
}

export async function apiAdminEventRetrieve(id: string) {
  const response = await instance.get<EventOut>(`/admin/events/${id}`);
  return response.data;
}

export async function apiAdminEventCreate(data: EventIn) {
  const response = await instance.post<EventOut>('/admin/events', data);
  return response.data;
}

export async function apiAdminEventUpdate(id: string, data: EventIn) {
  const response = await instance.put<EventOut>(`/admin/events/${id}`, data);
  return response.data;
}

export async function apiAdminEventPartUpdate(
  id: string,
  data: Partial<EventIn>,
) {
  const response = await instance.patch<EventOut>(`/admin/events/${id}`, data);
  return response.data;
}

export async function apiAdminEventDestroy(id: string) {
  const response = await instance.delete<null>(`/admin/events/${id}`);
  return response.data;
}

export async function apiAdminEventReservationList(id: string) {
  const response = await instance.get<EventReservationOut>(
    `/admin/events/${id}/reservations`,
  );
  return response.data;
}
