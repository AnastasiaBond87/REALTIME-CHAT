import jwt from 'jsonwebtoken';
import TokenModel from '../models/TokenModel.js';

class TokenService {
  accessTokenAge = 30 * 24 * 60 * 60 * 1000;
  refreshTokenAge = 60 * 60 * 1000;
  accessTokenSecret = process.env.JWT_ACCESS_SECRET ?? '';
  refreshTokenSecret = process.env.JWT_REFRESH_SECRET ?? '';

  generateTokens(email: string) {
    const accessToken = jwt.sign({ email }, this.accessTokenSecret, {
      expiresIn: this.refreshTokenAge,
    });
    const refreshToken = jwt.sign({ email }, this.refreshTokenSecret, {
      expiresIn: this.accessTokenAge,
    });

    return { accessToken, refreshToken };
  }

  async saveToken(refreshToken: string, id: string) {
    const tokenData = await TokenModel.findOne({ userId: id });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.save();
    } else {
      const newToken = await TokenModel.create({ userId: id, refreshToken });
      return newToken;
    }
  }

  async deleteToken(refreshToken: string) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token: string) {
    jwt.verify(token, this.accessTokenSecret, (err, decoded) => {
      if (err) {
        throw new Error(err.message);
      }
      return decoded;
    });
  }

  validateRefreshToken(token: string) {
    jwt.verify(token, this.refreshTokenSecret, (err, decoded) => {
      if (err) {
        throw new Error(err.message);
      }
      return decoded;
    });
  }
}

export default new TokenService();
