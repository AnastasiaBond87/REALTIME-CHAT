import { Endpoints } from '@/constants/url';
import type { IUserResponse, IDeleteResponse } from '@/types/api.types';
import axiosInstance from '@/api/instance';

class UserApi {
  static registration = (name: string, email: string, password: string): Promise<IUserResponse> =>
    axiosInstance.post(Endpoints.registration, { name, password, email }).then((res) => res.data);

  static login = (email: string, password: string): Promise<IUserResponse> =>
    axiosInstance.post(Endpoints.login, { password, email }).then((res) => res.data);

  static logout = (): Promise<IDeleteResponse> =>
    axiosInstance.post(Endpoints.logout).then((res) => res.data);

  static updateProfile = (id: string, name: string, email: string): Promise<IUserResponse> =>
    axiosInstance.patch(Endpoints.updateProfile, { _id: id, name, email }).then((res) => res.data);

  static updatePassword = (
    id: string,
    password: string,
    newPassword: string
  ): Promise<IUserResponse> =>
    axiosInstance
      .patch(Endpoints.updatePassword, {
        _id: id,
        password,
        newPassword,
      })
      .then((res) => res.data);
  static uploadAvatar = (formData: FormData): Promise<IUserResponse> =>
    axiosInstance.patch(Endpoints.uploadAvatar, formData).then((res) => res.data);
}

export default UserApi;
