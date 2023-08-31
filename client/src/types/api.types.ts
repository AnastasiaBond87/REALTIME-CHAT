interface IError {
  error: boolean;
  message: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

type TUserApi<T> = (args: T) => Promise<IUser | void>;

export type { IError, IUser, TUserApi };
