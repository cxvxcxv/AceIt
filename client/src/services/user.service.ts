import { SERVER_ENDPOINTS } from '@/constants/server-endpoint.constants';

import { TAuthInput } from '@/types/auth.types';
import { IProfile } from '@/types/user.types';

import { axiosAuth } from '@/api/interceptors';

export const UserService = {
  async getProfile() {
    try {
      const response = await axiosAuth.get<IProfile>(
        `${SERVER_ENDPOINTS.PROFILE.BASE}`,
      );
      return response.data;
    } catch (error) {}
  },

  async update(data: TAuthInput) {
    try {
      const response = await axiosAuth.put<IProfile>(
        `${SERVER_ENDPOINTS.PROFILE.BASE}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete() {
    try {
      const response = await axiosAuth.delete<IProfile>(
        `${SERVER_ENDPOINTS.PROFILE.BASE}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
