import { Schema, model } from 'mongoose';
import { IToken } from '../types/index.js';

const tokenShema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: Schema.Types.String,
    require: true,
  },
});

const TokenModel = model('Token', tokenShema);

export default TokenModel;
