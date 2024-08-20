import jwt from 'jsonwebtoken';

import { LocalStorageKey } from '@/enums/local-storage-key';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/helpers/local-storage';
import { queryClient } from '@/queries/client';
import { type TokenPayload } from '@/schema/auth';

export function getAdminToken() {
  return getLocalStorage<TokenPayload | undefined>(LocalStorageKey.ADMIN_TOKEN);
}

export function decodeAdminToken(type: 'accessToken' | 'refreshToken') {
  const token = getAdminToken();
  if (!token) return undefined;
  return jwt.decode(token[type]) as jwt.JwtPayload;
}

export function setAdminToken(value: TokenPayload) {
  setLocalStorage<TokenPayload>(LocalStorageKey.ADMIN_TOKEN, value);
}

export function removeAdminToken() {
  removeLocalStorage(LocalStorageKey.ADMIN_TOKEN);
  queryClient.clear();
}

export function hasAdminToken() {
  return !!getAdminToken();
}
