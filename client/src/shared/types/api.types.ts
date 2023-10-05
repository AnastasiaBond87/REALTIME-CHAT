import type { IUser } from '@/types/common.types';

interface IErrorResponse {
  error: boolean;
  message: string;
}

interface IUserResponse extends IUser {
  accessToken: string;
}

interface IDeleteResponse {
  error: boolean;
  message: string;
}

export type { IErrorResponse, IUserResponse, IDeleteResponse };
