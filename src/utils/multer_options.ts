import { HttpException, HttpStatus } from '@nestjs/common';
import { SendResponse } from './send-response';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';


export const multerOptions : MulterOptions  = {
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      cb(
        new HttpException(
          SendResponse.error('EXTENSION_NOT_ALLOW'),
          HttpStatus.FORBIDDEN,
        ),
        false,
      );
    }
  },
};
