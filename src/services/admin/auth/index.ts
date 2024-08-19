import type {
  LoginIn,
  RefreshIn,
  RegisterIn,
  TokenPayload,
  UserInfo,
} from '@/schema/auth';
import instance from '@/services/instance';

export async function apiAdminAuthLogin(data: LoginIn) {
  const response = await instance.post<TokenPayload>('/admin/auth/login', data);
  return response.data;
}

export async function apiAdminAuthRefresh(data: RefreshIn) {
  const response = await instance.post<TokenPayload>(
    '/admin/auth/refresh',
    data,
  );
  return response.data;
}

export async function apiAdminAuthMe() {
  const response = await instance.get<UserInfo>('/admin/auth/me');
  return response.data;
}

export async function apiAdminAuthRegister(data: RegisterIn) {
  const response = await instance.post<UserInfo>('/admin/auth/register', data);
  return response.data;
}
