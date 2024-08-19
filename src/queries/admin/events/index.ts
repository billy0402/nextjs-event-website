import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { queryClient } from '@/queries/client';
import type { EventIn } from '@/schema/event';
import {
  apiAdminEventCreate,
  apiAdminEventDestroy,
  apiAdminEventList,
  apiAdminEventPartUpdate,
  apiAdminEventReservationList,
  apiAdminEventRetrieve,
  apiAdminEventUpdate,
} from '@/services/admin/events';

const moduleName = ApiModule.EVENTS;
const queryKeys = {
  list: () => [moduleName, 'list'] as const,
  retrieve: (id: string) => [moduleName, 'retrieve', id] as const,
  reservations: (id: string) => [moduleName, 'reservations', id] as const,
};

export const useAdminEventList = () => {
  return useQuery({
    queryKey: queryKeys.list(),
    queryFn: () => apiAdminEventList(),
  });
};

export const useAdminEventRetrieve = (id: string) => {
  return useQuery({
    queryKey: queryKeys.retrieve(id),
    queryFn: () => apiAdminEventRetrieve(id),
    enabled: !!id && id !== 'create',
  });
};

export const useAdminEventCreate = () => {
  return useMutation({
    mutationFn: (data: EventIn) => apiAdminEventCreate(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(data.id), data);
    },
  });
};

export const useAdminEventUpdate = (id: string) => {
  return useMutation({
    mutationFn: (data: EventIn) => apiAdminEventUpdate(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(id), data);
    },
  });
};

export const useAdminEventPartUpdate = (id: string) => {
  return useMutation({
    mutationFn: (data: Partial<EventIn>) => apiAdminEventPartUpdate(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(id), data);
    },
  });
};

export const useAdminEventDestroy = () => {
  return useMutation({
    mutationFn: (id: string) => apiAdminEventDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list() });
    },
  });
};

export const useAdminEventReservationList = (id: string) => {
  return useQuery({
    queryKey: queryKeys.reservations(id),
    queryFn: () => apiAdminEventReservationList(id),
    enabled: !!id,
  });
};
