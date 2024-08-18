import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { queryClient } from '@/queries/client';
import type { EventIn } from '@/schema/event';
import {
  apiEventCreate,
  apiEventDestroy,
  apiEventList,
  apiEventPartUpdate,
  apiEventRetrieve,
  apiEventUpdate,
} from '@/services/events';

const moduleName = ApiModule.EVENTS;
const queryKeys = {
  list: () => [moduleName, 'list'] as const,
  retrieve: (id: string) => [moduleName, 'retrieve', id] as const,
  reservations: (eventId: string) =>
    [moduleName, 'reservations', eventId] as const,
};

export const useEventList = () => {
  return useQuery({
    queryKey: queryKeys.list(),
    queryFn: () => apiEventList(),
  });
};

export const useEventRetrieve = (id: string) => {
  return useQuery({
    queryKey: queryKeys.retrieve(id),
    queryFn: () => apiEventRetrieve(id),
    enabled: !!id && id !== 'create',
  });
};

export const useEventCreate = () => {
  return useMutation({
    mutationFn: (data: EventIn) => apiEventCreate(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(data.id), data);
    },
  });
};

export const useEventUpdate = (id: string) => {
  return useMutation({
    mutationFn: (data: EventIn) => apiEventUpdate(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(id), data);
    },
  });
};

export const useEventPartUpdate = (id: string) => {
  return useMutation({
    mutationFn: (data: Partial<EventIn>) => apiEventPartUpdate(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(id), data);
    },
  });
};

export const useEventDestroy = () => {
  return useMutation({
    mutationFn: (id: string) => apiEventDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list() });
    },
  });
};
