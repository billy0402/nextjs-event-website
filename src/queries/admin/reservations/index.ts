import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { queryClient } from '@/queries/client';
import type { ReservationIn } from '@/schema/reservation';
import {
  apiAdminReservationCreate,
  apiAdminReservationDestroy,
  apiAdminReservationList,
  apiAdminReservationRetrieve,
} from '@/services/admin/reservations';

const moduleName = ApiModule.ADMIN_RESERVATIONS;
const queryKeys = {
  list: (params: { eventId?: string } = {}) =>
    [moduleName, 'list', params] as const,
  retrieve: (id: string) => [moduleName, 'retrieve', id] as const,
};

export const useAdminReservationList = (params: { eventId?: string } = {}) => {
  return useQuery({
    queryKey: queryKeys.list(params),
    queryFn: () => apiAdminReservationList(params),
  });
};

export const useAdminReservationRetrieve = (id: string) => {
  return useQuery({
    queryKey: queryKeys.retrieve(id),
    queryFn: () => apiAdminReservationRetrieve(id),
    enabled: !!id,
  });
};

export const useAdminReservationCreate = () => {
  return useMutation({
    mutationFn: (data: ReservationIn) => apiAdminReservationCreate(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(data.id), data);
    },
  });
};

export const useAdminReservationDestroy = () => {
  return useMutation({
    mutationFn: (id: string) => apiAdminReservationDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list() });
    },
  });
};
