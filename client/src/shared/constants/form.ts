const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const customMessages = {
  userEmail: {
    required: 'Email is required',
    pattern: 'Email must match the pattern yourmail@example.com',
  },
  userPassword: {
    required: 'Password is required',
    pattern:
      'Password must be 8-15 characters, include at least one lowercase letter, one uppercase letter, and a number',
  },
  userName: {
    required: 'Name is required',
    minLength: 'Name must have at least 3 characters',
    maxLength: 'Max name length 10 characters',
  },
  confirmPassword: {
    required: 'Confirm password',
    match: 'Passwords must match',
  },
};

export { initialState, customMessages };
