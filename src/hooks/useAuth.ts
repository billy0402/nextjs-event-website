import { useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useToast } from '@chakra-ui/react';
import jwt from 'jsonwebtoken';

import { LocalStorageKey } from '@/enums/local-storage-key';
import { removeAdminToken } from '@/helpers/token';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { TokenPayload } from '@/schema/auth';

const useAuth = () => {
  const router = useRouter();
  const toast = useToast();

  const token = useLocalStorage<TokenPayload | undefined>(
    LocalStorageKey.PUBLIC_TOKEN,
  );
  const tokenData = useMemo(() => {
    if (!token) return undefined;
    return jwt.decode(token.accessToken);
  }, [token]);

  useEffect(() => {
    if (token) return;
    removeAdminToken();
    toast({
      status: 'error',
      title: 'Token is not found or expired',
      description: 'Please login again',
    });
    router.push('/auth/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { tokenData };
};

export default useAuth;
