import axios, {
  AxiosError,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

import { getErrorMessage } from './get-error-message';
import {
  getAccessToken,
  removeTokenFromStorage,
} from '@/services/auth/auth.helper';
import { AuthService } from '@/services/auth/auth.service';

interface IAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

export const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

export const axiosPublic = axios.create(options);
export const axiosAuth = axios.create(options);

axiosAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosAuth.interceptors.response.use(
  config => config,
  async (error: AxiosError) => {
    const originalRequest = error.config as IAxiosRequestConfig;

    if (!error.message) {
      return Promise.reject(
        new Error('Server may be down or unreachable. Please try again later.'),
      );
    }

    const errorMessage = getErrorMessage(error);
    if (
      (error.response?.status === 401 ||
        errorMessage === 'jwt expired' ||
        errorMessage === 'jwt must be provided') &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await AuthService.refreshTokens();
        return axiosAuth.request(originalRequest);
      } catch (refreshError) {
        if (getErrorMessage(refreshError) === 'jwt expired') {
          removeTokenFromStorage();
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
