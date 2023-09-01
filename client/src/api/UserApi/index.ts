import { Endpoints } from '@/constants/url';
import type { IUserResponse, TRegistrationRequest, TLoginRequest } from '@/types/api.types';
import axiosInstance from '@/api/instance';

class UserApi {
  static async registration({
    name,
    email,
    password,
  }: TRegistrationRequest): Promise<IUserResponse> {
    const res = await axiosInstance.post(Endpoints.registration, { name, password, email });
    const { data } = res;
    return data;
  }

  static async login({ email, password }: TLoginRequest): Promise<IUserResponse | void> {
    const res = await axiosInstance.post(Endpoints.login, { password, email });
    const { data } = res;
    return data;
  }
}

export default UserApi;
