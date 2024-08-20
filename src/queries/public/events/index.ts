import { useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { apiEventList, apiEventRetrieve } from '@/services/public/events';

const moduleName = ApiModule.EVENTS;
const queryKeys = {
  list: () => [moduleName, 'list'] as const,
  retrieve: (id: string) => [moduleName, 'retrieve', id] as const,
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
