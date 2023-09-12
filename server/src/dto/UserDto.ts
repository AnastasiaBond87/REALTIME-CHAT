import { IUserData } from '../types/index.js';

class UserDto {
  id: string;
  name: string;
  email: string;
  accessToken?: string;
  avatar: string;

  constructor(data: IUserData) {
    this.name = data.name;
    this.id = data._id;
    this.email = data.email;
    this.accessToken = data.accessToken;
    this.avatar = data.avatar;
  }
}

export default UserDto;
