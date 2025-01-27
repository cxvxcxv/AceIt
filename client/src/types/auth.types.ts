import { IUser } from './user.types';

export enum EAuthMethod {
  LOGIN = 'login',
  REGISTER = 'register',
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export type TAuthForm = {
  username: string;
  password: string;
};

export type TAuthResponse = {
  user: IUser;
  accessToken: string;
};
