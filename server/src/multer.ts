import multer, { MulterError, diskStorage, type FileFilterCallback } from 'multer';

const uploader = multer({
  storage: diskStorage({}),
  limits: { fileSize: 2000000 },
  fileFilter(_, file: Express.Multer.File, cb: FileFilterCallback) {
    const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (mimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
    }
  },
}).single('file');

export default uploader;
