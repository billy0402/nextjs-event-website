import type { AxiosRequestConfig } from 'axios';

import type {
  LoginIn,
  RefreshIn,
  RegisterIn,
  TokenPayload,
  UserInfo,
} from '@/schema/auth';
import instance from '@/services/instance';

export async function apiAuthLogin(data: LoginIn) {
  const response = await instance.post<TokenPayload>('/auth/login', data);
  return response.data;
}

export async function apiAuthRefresh(
  data: RefreshIn,
  config?: AxiosRequestConfig,
) {
  const response = await instance.post<TokenPayload>(
    '/auth/refresh',
    data,
    config,
  );
  return response.data;
}

export async function apiAuthMe() {
  const response = await instance.get<UserInfo>('/auth/me');
  return response.data;
}

export async function apiAuthRegister(data: RegisterIn) {
  const response = await instance.post<UserInfo>('/auth/register', data);
  return response.data;
}
