import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { getToken, setToken } from '@/helpers/token';
import { queryClient } from '@/queries/client';
import {
  apiAdminAuthLogin,
  apiAdminAuthMe,
  apiAdminAuthRefresh,
  apiAdminAuthRegister,
} from '@/services/admin/auth';

const moduleName = ApiModule.AUTH;
const queryKeys = {
  tokenUser: () => [moduleName, 'tokenUser'] as const,
  user: () => [moduleName, 'user'] as const,
};

export const useAdminAuthLogin = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: apiAdminAuthLogin,
    onSuccess: (data) => {
      setToken(data);
      onSuccess();
    },
  });
};

export const useAdminAuthRefresh = () => {
  return useMutation({
    mutationFn: apiAdminAuthRefresh,
    onSuccess: (data) => {
      const token = getToken();
      setToken({ ...token, ...data });
    },
  });
};

export const useAdminAuthMe = () => {
  return useQuery({
    queryKey: queryKeys.user(),
    queryFn: apiAdminAuthMe,
    enabled: !!getToken(),
  });
};

export const useAdminAuthRegister = () => {
  return useMutation({
    mutationFn: apiAdminAuthRegister,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user(), data);
    },
  });
};
