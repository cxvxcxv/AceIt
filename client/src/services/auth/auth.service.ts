import { SERVER_ENDPOINTS } from '@/constants/server-endpoint.constants';

import { TAuthInput, TAuthMethod, TAuthResponse } from '@/types/auth.types';

import { axiosPublic } from '@/api/interceptors';

import { addTokenToStorage, removeTokenFromStorage } from './auth.helper';

export const AuthService = {
  async auth(authMethod: TAuthMethod, data: TAuthInput) {
    try {
      const response = await axiosPublic.post<TAuthResponse>(
        `${SERVER_ENDPOINTS.AUTH.BASE}/${authMethod}`,
        data,
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async refreshTokens() {
    try {
      const response = await axiosPublic.post<TAuthResponse>(
        `${SERVER_ENDPOINTS.AUTH.LOGIN.REFRESH_TOKENS}`,
      );

      if (response.data.accessToken)
        addTokenToStorage(response.data.accessToken);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      const response = await axiosPublic.post<boolean>(
        `${SERVER_ENDPOINTS.AUTH.LOGOUT.BASE}`,
      );

      if (response.data) removeTokenFromStorage();

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
