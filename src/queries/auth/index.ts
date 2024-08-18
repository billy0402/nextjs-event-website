import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiModule } from '@/enums/api-module';
import { getToken, getTokenData, setToken } from '@/helpers/token';
import { queryClient } from '@/queries/client';
import type { TokenData } from '@/schema/auth';
import {
  apiAuthLogin,
  apiAuthMe,
  apiAuthRefresh,
  apiAuthRegister,
} from '@/services/auth';

const moduleName = ApiModule.AUTH;
const queryKeys = {
  tokenUser: () => [moduleName, 'tokenUser'] as const,
  user: () => [moduleName, 'user'] as const,
};

export const useAuthLogin = (
  onSuccess: (tokenData: TokenData | undefined) => void,
) => {
  return useMutation({
    mutationFn: apiAuthLogin,
    onSuccess: (data) => {
      setToken(data);
      const tokenData = getTokenData('accessToken');
      onSuccess(tokenData);
    },
  });
};

export const useAuthRefresh = () => {
  return useMutation({
    mutationFn: apiAuthRefresh,
    onSuccess: (data) => {
      const token = getToken();
      setToken({ ...token, ...data });
    },
  });
};

export const useAuthMe = () => {
  return useQuery({
    queryKey: queryKeys.user(),
    queryFn: apiAuthMe,
    enabled: !!getToken(),
  });
};

export const useAuthRegister = () => {
  return useMutation({
    mutationFn: apiAuthRegister,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user(), data);
    },
  });
};
