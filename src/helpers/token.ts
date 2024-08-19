import jwt from 'jsonwebtoken';

import { LocalStorageKey } from '@/enums/local-storage-key';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/helpers/local-storage';
import { queryClient } from '@/queries/client';
import { type TokenPayload } from '@/schema/auth';

export function getToken() {
  return getLocalStorage<TokenPayload | undefined>(LocalStorageKey.ADMIN_TOKEN);
}

export function getTokenData(type: 'accessToken' | 'refreshToken') {
  const token = getToken();
  if (!token) return undefined;
  let tokenData = jwt.decode(token[type]) as jwt.JwtPayload;
  return tokenData;
}

export function setToken(value: TokenPayload) {
  setLocalStorage<TokenPayload>(LocalStorageKey.ADMIN_TOKEN, value);
}

export function removeToken() {
  removeLocalStorage(LocalStorageKey.ADMIN_TOKEN);
  queryClient.clear();
}

export function hasToken() {
  return !!getToken();
}

export function decodeToken() {
  const token = getToken();
  if (!token) return undefined;

  return jwt.decode(token.accessToken) as jwt.JwtPayload;
}
