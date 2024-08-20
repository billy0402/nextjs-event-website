import { useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { apiNewsList, apiNewsRetrieve } from '@/services/public/news';

const moduleName = ApiModule.ADMIN_NEWS;
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
