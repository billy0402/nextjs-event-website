import { useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import jwt from 'jsonwebtoken';

import { useToast } from '@chakra-ui/react';

import { LocalStorageKey } from '@/enums/local-storage-key';
import { removeToken } from '@/helpers/token';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { TokenPayload } from '@/schema/auth';

const useAdminAuth = () => {
  const router = useRouter();
  const toast = useToast();

  const { pathname } = router;

  const token = useLocalStorage<TokenPayload | undefined>(
    LocalStorageKey.TOKEN,
  );
  const tokenData = useMemo(() => {
    if (!token) return undefined;
    return jwt.decode(token.accessToken);
  }, [token]);

  useEffect(() => {
    if (token) return;
    removeToken();
    toast({
      status: 'error',
      title: 'Token is not found or expired',
      description: 'Please login again',
    });
    router.push(
      pathname.startsWith('/admin') ? '/admin/auth/login' : '/auth/login',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { tokenData };
};

export default useAdminAuth;
