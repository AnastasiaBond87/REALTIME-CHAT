const BASE_URL = 'http://localhost:5000';

enum Endpoints {
  registration = 'user/registration',
  login = 'user/login',
  logout = 'user/logout',
  updateProfile = 'user/updateProfile',
  updatePassword = 'user/updatePassword',
  uploadAvatar = 'upload/avatar',
}

export { BASE_URL, Endpoints };
