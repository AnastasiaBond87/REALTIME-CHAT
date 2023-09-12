const validatePassword = (value: string) =>
  /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,15}/.test(value);

export { validatePassword };
