import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import config from 'src/config/config';
import * as path from 'path';
import { UtilsProvider } from './provider';

@Injectable()
export class FileManagerService {
  constructor() {}

  async removePictureByTime() {
    try {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      const manage_foler = `public/${config.TMP_FOLDER.value}`;
      let counter = 0;
      while (true) {
        if (counter == config.TMP_RELOAD_CHECKER.value) {
          counter = 0;
          fs.readdirSync(manage_foler).forEach((file) => {
            try {
              const stats = fs.statSync(join(manage_foler, file));
              const get_now = new Date();
              const diffTime = Math.abs(
                (get_now.getTime() - stats.birthtime.getTime()) / 1000,
              );
              if (diffTime > config.TMP_FILE_MAX.value) {
                console.log('remove ' + join(manage_foler, file));
                fs.unlinkSync(join(manage_foler, file));
              }
            } catch (e) {
              console.log(e);
            }
          });
        } else {
          counter++;
        }
        await delay(1000);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static ModuleFileSave(id: number, request_file: string, folder: string) {
    if (!request_file) {
      return null;
    }

    const checkfile = FileManagerService.findFilebyId(folder, id);
    // var get_tmp_file = user.avatar.substring(user.avatar.lastIndexOf('/') + 1);

    request_file = join(`public/tmp/`, path.basename(request_file));
    if (!fs.existsSync(request_file)) {
      throw 'PICTURE_ERROR';
    }
    const new_file_name = `public/${folder}/${id}_${+new Date()}_${UtilsProvider.randomNumber(
      10,
    )}`;
    if (checkfile) {
      fs.unlinkSync(checkfile);
      fs.renameSync(request_file, new_file_name);
    } else {
      fs.renameSync(request_file, new_file_name);
    }
    return new_file_name.replace('public/', '');
  }

  static findFilebyId(folder: string, user_id: number) {
    const manage_foler = `public/${folder}`;

    const list_files = fs.readdirSync(manage_foler);
    for (const file of list_files) {
      const id_file = file.split('_');
      if (user_id == parseInt(id_file[0])) {
        return join(manage_foler, file);
      }
    }
    return null;
  }

  static LocalSavePicture(
    folder: string,
    file: Express.Multer.File,
    filename: string,
  ) {
    try {
      const public_folder = `public/${folder}`;
      const extArray = file.mimetype.split('/');
      const savePicture = join(public_folder, `${filename}.tmp`);
      fs.writeFileSync(savePicture, file.buffer);
      while (!fs.existsSync(savePicture)) {}
      return `${filename}.tmp`;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
