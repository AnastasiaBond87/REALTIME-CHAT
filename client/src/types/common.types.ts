type TSize = 'sm' | 'md' | 'lg';

type TTheme = 'dark' | 'light';

type TFormView = 'SignIn' | 'SignUp';

interface IFormFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface ITabs {
  id: number;
  name: string;
  title: string;
}

export type { TSize, TFormView, IFormFields, IUser, TTheme, ITabs };
