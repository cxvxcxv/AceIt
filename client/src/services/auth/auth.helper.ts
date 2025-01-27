import Cookies from 'js-cookie';

import { ECookiesKeys } from '@/types/api.types';

export const getAccessToken = () => {
  const accessToken = Cookies.get(ECookiesKeys.ACCESS_TOKEN);
  return accessToken || null;
};

export const addTokenToStorage = (accessToken: string) => {
  accessToken = accessToken.slice(7); //removes 'Bearer ' prefix
  Cookies.set(ECookiesKeys.ACCESS_TOKEN, accessToken, {
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    sameSite: 'strict',
    expires: 1, //lives 1 day in storage
  });
};

export const removeTokenFromStorage = () => {
  Cookies.remove(ECookiesKeys.ACCESS_TOKEN);
};
