import { BASE_URL, Endpoints } from '@/constants/url';
import axios, { AxiosError } from 'axios';
import type { IUser, TUserApi } from '@/types/api.types';

const registration: TUserApi<Pick<IUser, 'name' | 'email' | 'password'>> = async ({
  name,
  email,
  password,
}) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/${Endpoints.registration}`,
      { name, password, email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { data } = res;

    return data;
  } catch (err) {
    const { response } = err as AxiosError<{ error: boolean; message: string }>;

    if (response) {
      throw new Error(response.data.message);
    } else {
      throw new Error('Internal Server Error');
    }
  }
};

const login: TUserApi<Pick<IUser, 'email' | 'password'>> = async ({ email, password }) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/${Endpoints.login}`,
      { password, email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { data } = res;

    return data;
  } catch (err) {
    const { response } = err as AxiosError<{ error: boolean; message: string }>;

    if (response) {
      throw new Error(response.data.message);
    } else {
      throw new Error('UNKNOWN_ERROR');
    }
  }
};

export { registration, login };
