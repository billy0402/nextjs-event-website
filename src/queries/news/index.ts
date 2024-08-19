import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { queryClient } from '@/queries/client';
import type { NewsIn } from '@/schema/news';
import {
  apiNewsCreate,
  apiNewsDestroy,
  apiNewsList,
  apiNewsPartUpdate,
  apiNewsRetrieve,
  apiNewsUpdate,
} from '@/services/news';

const moduleName = ApiModule.NEWS;
const queryKeys = {
  list: () => [moduleName, 'list'] as const,
  retrieve: (id: string) => [moduleName, 'retrieve', id] as const,
};

export const useNewsList = () => {
  return useQuery({
    queryKey: queryKeys.list(),
    queryFn: () => apiNewsList(),
  });
};

export const useNewsRetrieve = (id: string) => {
  return useQuery({
    queryKey: queryKeys.retrieve(id),
    queryFn: () => apiNewsRetrieve(id),
    enabled: !!id && id !== 'create',
  });
};

export const useNewsCreate = () => {
  return useMutation({
    mutationFn: (data: NewsIn) => apiNewsCreate(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(data.id), data);
    },
  });
};

export const useNewsUpdate = (id: string) => {
  return useMutation({
    mutationFn: (data: NewsIn) => apiNewsUpdate(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(id), data);
    },
  });
};

export const useNewsPartUpdate = (id: string) => {
  return useMutation({
    mutationFn: (data: Partial<NewsIn>) => apiNewsPartUpdate(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.retrieve(id), data);
    },
  });
};

export const useNewsDestroy = () => {
  return useMutation({
    mutationFn: (id: string) => apiNewsDestroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list() });
    },
  });
};
