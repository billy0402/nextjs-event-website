import type { ReservationIn, ReservationOut } from '@/schema/reservation';
import instance from '@/services/instance';

export async function apiReservationList(params: { eventId?: string } = {}) {
  const response = await instance.get<ReservationOut[]>('/reservations', {
    params,
  });
  return response.data;
}

export async function apiReservationRetrieve(id: string) {
  const response = await instance.get<ReservationOut>(`/reservations/${id}`);
  return response.data;
}

export async function apiReservationCreate(data: ReservationIn) {
  const response = await instance.post<ReservationOut>('/reservations', data);
  return response.data;
}

export async function apiReservationDestroy(id: string) {
  const response = await instance.delete<null>(`/reservations/${id}`);
  return response.data;
}
