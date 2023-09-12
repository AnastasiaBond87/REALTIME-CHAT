import { Request } from 'express';

type TRequestBody<T> = Request<object, object, T>;

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface IToken {
  userId: IUser;
  refreshToken: string;
}

interface IUserData extends IUser {
  refreshToken?: string;
  accessToken?: string;
}

export type { TRequestBody, IUser, IToken, IUserData };
