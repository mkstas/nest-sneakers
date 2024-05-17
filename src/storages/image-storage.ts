import { diskStorage } from 'multer';
import * as uuid from 'uuid';

export const imageStorage = diskStorage({
  destination: './uploads',
  filename: (_, file, callback) => {
    const fileExtension = file.originalname.match('.[0-9a-z]{1,5}$')[0];
    const fileName = uuid.v4() + fileExtension;
    callback(null, fileName);
  },
});
