import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { queryClient } from '@/queries/client';
import type { NewsIn } from '@/schema/news';
import {
  apiAdminNewsCreate,
  apiAdminNewsDestroy,
  apiAdminNewsList,
  apiAdminNewsPartUpdate,
  apiAdminNewsRetrieve,
  apiAdminNewsUpdate,
} from '@/services/admin/news';

const moduleName = ApiModule.NEWS;
const queryKeys = {
  list: () => [moduleName, 'list'] as const,
  retrieve: (id: string) => [moduleName, 'retrieve', id] as const,
};

export const useAdminNewsList = () => {
  return useQuery({
    queryKey: queryKeys.list(),
    queryFn: () => apiAdminNewsList(),
  });
};

export const useAdminNewsRetrieve = (id: string) => {
  return useQuery({
    queryKey: queryKeys.retrieve(id),
    queryFn: () => apiAdminNewsRetrieve(id),
    enabled: !!id && id !== 'create',
  });
};

export const useAdminNewsCreate = () => {
  return useMutation({
    mutationFn: (data: NewsIn) => apiAdminNewsCreate(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(data.id), data);
    },
  });
};

export const useAdminNewsUpdate = (id: string) => {
  return useMutation({
    mutationFn: (data: NewsIn) => apiAdminNewsUpdate(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(id), data);
    },
  });
};

export const useAdminNewsPartUpdate = (id: string) => {
  return useMutation({
    mutationFn: (data: Partial<NewsIn>) => apiAdminNewsPartUpdate(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(id), data);
    },
  });
};

export const useAdminNewsDestroy = () => {
  return useMutation({
    mutationFn: (id: string) => apiAdminNewsDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list() });
    },
  });
};
