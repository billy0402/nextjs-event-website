import type { ReservationIn, ReservationOut } from '@/schema/reservation';
import instance from '@/services/instance';

export async function apiAdminReservationList(
  params: { eventId?: string } = {},
) {
  const response = await instance.get<ReservationOut[]>('/admin/reservations', {
    params,
  });
  return response.data;
}

export async function apiAdminReservationRetrieve(id: string) {
  const response = await instance.get<ReservationOut>(
    `/admin/reservations/${id}`,
  );
  return response.data;
}

export async function apiAdminReservationCreate(data: ReservationIn) {
  const response = await instance.post<ReservationOut>(
    '/admin/reservations',
    data,
  );
  return response.data;
}

export async function apiAdminReservationDestroy(id: string) {
  const response = await instance.delete<null>(`/admin/reservations/${id}`);
  return response.data;
}
