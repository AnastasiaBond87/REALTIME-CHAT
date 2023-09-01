import type { IUser } from '@/types/common.types';

interface IErrorResponse {
  error: boolean;
  message: string;
}

type TLoginRequest = Pick<IUser, 'email' | 'password'>;

type TRegistrationRequest = TLoginRequest & Pick<IUser, 'name'>;

interface IUserResponse extends IUser {
  accessToken: string;
}

export type { IErrorResponse, TLoginRequest, TRegistrationRequest, IUserResponse };
