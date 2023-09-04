import { Request } from 'express';

type TRequestBody<T> = Request<object, object, T>;

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

interface IToken {
  user: IUser;
  refreshToken: string;
}

export type { TRequestBody, IUser, IToken };
