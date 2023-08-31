type TSize = 'sm' | 'md' | 'lg';

type TFormView = 'SignIn' | 'SignUp';

interface IFormFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type { TSize, TFormView, IFormFields };
