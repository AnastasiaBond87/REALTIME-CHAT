const BASE_URL = 'http://localhost:5000';

enum Endpoints {
  registration = 'api/registration',
  login = 'api/login',
  logout = 'api/logout',
  updateProfile = 'api/updateProfile',
  updatePassword = 'api/updatePassword',
}

export { BASE_URL, Endpoints };
