import axios from 'axios';

import { BASE_API_URL } from '@/fixtures/constants';
import { getToken, removeToken, setToken } from '@/helpers/token';
import { apiAuthRefresh } from '@/services/auth';

const instance = axios.create({
  baseURL: BASE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
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
        const token = getToken();
        if (!token) return await Promise.reject(error);

        const newToken = await apiAuthRefresh({
          refreshToken: token.refreshToken,
        });
        setToken(newToken);

        instance.defaults.headers.common.Authorization = `Bearer ${newToken.accessToken}`;
        return await instance(originalRequest);
      } catch (refreshError) {
        removeToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
