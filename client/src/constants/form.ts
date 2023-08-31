import type { IFormFields } from '@/types/common.types';

const initialState: IFormFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

enum customMessages {
  emailRequired = 'Email is required',
  emailPattern = 'Email must match the pattern yourmail@example.com',
  passwordRequired = 'Password is required',
  passwordPattern = 'Password must be 8-15 characters, include at least one lowercase letter, one uppercase letter, and a number',
  nameRequired = 'Name is required',
  nameLength = 'Name must have at least 3 characters',
  confirmPasswordRequired = 'Confirm password',
  confirmPasswordMatch = 'Passwords must match',
}

const passwordPattern = (value: string) =>
  /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,15}/.test(value);

export { initialState, customMessages, passwordPattern };
