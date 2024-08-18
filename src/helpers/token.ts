import jwt from 'jsonwebtoken';

import { LocalStorageKey } from '@/enums/local-storage-key';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/helpers/local-storage';
import { queryClient } from '@/queries/client';
import {
  TokenDataSchema,
  type TokenData,
  type TokenPayload,
} from '@/schema/auth';

export function getToken() {
  return getLocalStorage<TokenPayload | undefined>(LocalStorageKey.TOKEN);
}

export function getTokenData(type: 'accessToken' | 'refreshToken') {
  const token = getToken();
  if (!token) return undefined;
  let tokenData = jwt.decode(token[type]) as TokenData;
  tokenData = TokenDataSchema.parse(tokenData);
  return tokenData;
}

export function setToken(value: TokenPayload) {
  setLocalStorage<TokenPayload>(LocalStorageKey.TOKEN, value);
}

export function removeToken() {
  removeLocalStorage(LocalStorageKey.TOKEN);
  queryClient.clear();
}

export function hasToken() {
  return !!getToken();
}

export function decodeToken() {
  const token = getToken();
  if (!token) return undefined;

  return jwt.decode(token.accessToken) as TokenPayload;
}
