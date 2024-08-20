import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { getAdminToken, setAdminToken } from '@/helpers/token';
import { queryClient } from '@/queries/client';
import {
  apiAdminAuthLogin,
  apiAdminAuthMe,
  apiAdminAuthRefresh,
  apiAdminAuthRegister,
} from '@/services/admin/auth';

const moduleName = ApiModule.ADMIN_AUTH;
const queryKeys = {
  tokenUser: () => [moduleName, 'tokenUser'] as const,
  user: () => [moduleName, 'user'] as const,
};

export const useAdminAuthLogin = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: apiAdminAuthLogin,
    onSuccess: (data) => {
      setAdminToken(data);
      onSuccess();
    },
  });
};

export const useAdminAuthRefresh = () => {
  return useMutation({
    mutationFn: apiAdminAuthRefresh,
    onSuccess: (data) => {
      const token = getAdminToken();
      setAdminToken({ ...token, ...data });
    },
  });
};

export const useAdminAuthMe = () => {
  return useQuery({
    queryKey: queryKeys.user(),
    queryFn: apiAdminAuthMe,
    enabled: !!getAdminToken(),
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
