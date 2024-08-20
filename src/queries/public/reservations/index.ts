import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { queryClient } from '@/queries/client';
import type { ReservationIn } from '@/schema/reservation';
import {
  apiReservationCreate,
  apiReservationDestroy,
  apiReservationList,
  apiReservationRetrieve,
} from '@/services/public/reservations';

const moduleName = ApiModule.RESERVATIONS;
const queryKeys = {
  list: (params: { eventId?: string } = {}) =>
    [moduleName, 'list', params] as const,
  retrieve: (id: string) => [moduleName, 'retrieve', id] as const,
};

export const useReservationList = (params: { eventId?: string } = {}) => {
  return useQuery({
    queryKey: queryKeys.list(params),
    queryFn: () => apiReservationList(params),
  });
};

export const useReservationRetrieve = (id: string) => {
  return useQuery({
    queryKey: queryKeys.retrieve(id),
    queryFn: () => apiReservationRetrieve(id),
    enabled: !!id,
  });
};

export const useReservationCreate = () => {
  return useMutation({
    mutationFn: (data: ReservationIn) => apiReservationCreate(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(data.id), data);
    },
  });
};

export const useReservationDestroy = () => {
  return useMutation({
    mutationFn: (id: string) => apiReservationDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list() });
    },
  });
};
