import { Request } from 'express';

type TRequestBody<T> = Request<object, object, T>;

interface IUser {
  name: string;
  email: string;
  password: string;
}

export type { TRequestBody, IUser };
