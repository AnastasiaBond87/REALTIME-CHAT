import { Schema, model } from 'mongoose';
import type { IUser } from '../types/index.js';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = model('User', userSchema);

export default UserModel;
