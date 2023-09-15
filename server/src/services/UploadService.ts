import cloudinary from '../cloudinary.js';
import AppError from '../helpers/AppError.js';
import UserModel from '../models/UserModel.js';

class UploadService {
  async uploadAvatar(id: string, path: string) {
    const { public_id } = await cloudinary.uploader.upload(path, {
      folder: process.env.CLOUDINARY_FOLDER,
    });

    if (!public_id) {
      throw new AppError(500, 'Upload error');
    }

    const user = await UserModel.findById(id);

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    user.avatar = public_id;
    await user.save();

    return user;
  }
}

export default new UploadService();
