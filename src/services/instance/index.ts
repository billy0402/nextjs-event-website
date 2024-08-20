import axios from 'axios';

import { BASE_API_URL } from '@/fixtures/constants';
import {
  getAdminToken,
  getToken,
  removeAdminToken,
  removeToken,
  setAdminToken,
  setToken,
} from '@/helpers/token';
import { apiAdminAuthRefresh } from '@/services/admin/auth';
import { apiAuthRefresh } from '@/services/public/auth';

const instance = axios.create({
  baseURL: BASE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const isAdmin = config.url?.startsWith('/admin');
    const token = isAdmin ? getAdminToken() : getToken();
    if (token) {
      config.headers!.Authorization = `Bearer ${token.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const isAdmin = error.config.url?.startsWith('/admin');
        const token = isAdmin ? getAdminToken() : getToken();
        if (!token) return await Promise.reject(error);

        if (isAdmin) {
          const newToken = await apiAdminAuthRefresh(
            { refreshToken: token.refreshToken },
            error.config,
          );
          setAdminToken(newToken);
        } else {
          const newToken = await apiAuthRefresh(
            { refreshToken: token.refreshToken },
            error.config,
          );
          setToken(newToken);
        }

        return await instance(originalRequest);
      } catch (refreshError) {
        const isAdmin = error.config.url?.startsWith('/admin');
        isAdmin ? removeAdminToken() : removeToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.response?.data ?? error);
  },
);

export default instance;
