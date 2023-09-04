import jwt from 'jsonwebtoken';
import TokenModel from '../models/TokenModel.js';

class TokenService {
  accessTokenAge = 30 * 24 * 60 * 60 * 1000;
  refreshTokenAge = 60 * 60 * 1000;

  generateTokens(email: string) {
    const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET ?? '', {
      expiresIn: this.refreshTokenAge,
    });
    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET ?? '', {
      expiresIn: this.accessTokenAge,
    });

    return { accessToken, refreshToken };
  }

  async saveToken(token: string, id: string) {
    const tokenData = await TokenModel.findOne({ user: id });

    if (tokenData) {
      tokenData.refreshToken = token;
      tokenData.save();
    } else {
      const newToken = await TokenModel.create({ user: id, refreshToken: token });
      return newToken;
    }
  }
}

export default new TokenService();
