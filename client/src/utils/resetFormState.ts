const resetFormState = <T>(formState: T, initialState: T) => {
  for (const key in formState) {
    formState[key as keyof T] = initialState[key as keyof T];
  }
};

export { resetFormState };
