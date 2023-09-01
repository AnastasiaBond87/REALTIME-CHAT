type TSize = 'sm' | 'md' | 'lg';

type TFormView = 'SignIn' | 'SignUp';

interface IFormFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type { TSize, TFormView, IFormFields, IUser };
