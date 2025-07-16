import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../strore/useAuthStore';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const apiInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

apiInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequests = error.config;

    if (
      originalRequests &&
      error.response?.status === 401 &&
      !originalRequests._retry
    ) {
      originalRequests._retry = true;

      try {
        const res = await apiInstance.post(
          '/auth/refresh-token',
          {},
          { withCredentials: true }
        );
        const accessToken = res.data?.accessToken;

        if (accessToken) {
          useAuthStore.getState().setToken(accessToken);
          originalRequests.headers.Authorization = `Bearer ${accessToken}`;

          return apiInstance(originalRequests);
        } else {
          useAuthStore.getState().clearAuth();
        }
      } catch (tokenErr) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(tokenErr);
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
