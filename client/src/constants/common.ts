import type { ITabs } from '../types/common.types';

enum Buttons {
  SignIn = 'Sign in',
  SignUp = 'Sign up',
  Reset = 'Reset',
}

const AccountTabs: ITabs[] = [
  {
    id: 1,
    name: 'user-info',
    title: 'User info',
  },
  {
    id: 2,
    name: 'password',
    title: 'Password',
  },
];

export { Buttons, AccountTabs };
