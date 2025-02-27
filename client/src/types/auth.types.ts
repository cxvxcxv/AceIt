import { IUser } from './user.types';

export enum EAuthMethod {
  LOGIN = 'login',
  REGISTER = 'register',
}

export type TAuthMethod = 'login' | 'register';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export type TAuthInput = {
  username: string;
  password: string;
};

export type TAuthResponse = {
  user: IUser;
  accessToken: string;
};
