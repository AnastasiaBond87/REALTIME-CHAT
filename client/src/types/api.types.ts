import type { IUser } from '@/types/common.types';

interface IErrorResponse {
  error: boolean;
  message: string;
}

type TLoginRequest = Pick<IUser, 'email' | 'password'>;

type TLogoutRequest = Pick<IUser, '_id'>;

type TRegistrationRequest = TLoginRequest & Pick<IUser, 'name'>;

interface IUserResponse extends IUser {
  accessToken: string;
}

interface IDeleteResponse {
  error: boolean;
  message: string;
}

export type {
  IErrorResponse,
  TLoginRequest,
  TRegistrationRequest,
  IUserResponse,
  TLogoutRequest,
  IDeleteResponse,
};
