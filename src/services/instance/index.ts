import axios from 'axios';

import { BASE_API_URL } from '@/fixtures/constants';
import {
  getAdminToken,
  removeAdminToken,
  setAdminToken,
} from '@/helpers/token';
import { apiAdminAuthRefresh } from '@/services/admin/auth';

const instance = axios.create({
  baseURL: BASE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = getAdminToken();
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
        const token = getAdminToken();
        if (!token) return await Promise.reject(error);

        const newToken = await apiAdminAuthRefresh(
          { refreshToken: token.refreshToken },
          error.config,
        );
        setAdminToken(newToken);

        return await instance(originalRequest);
      } catch (refreshError) {
        removeAdminToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
