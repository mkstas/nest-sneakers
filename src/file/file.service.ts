import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  async storeFile(file: Express.Multer.File) {
    try {
      const fileExtension = file.originalname.match('.[0-9a-z]{1,5}$')[0];
      const fileName = uuid.v4() + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'uploads');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при записи файла');
    }
  }

  async removeFile(fileName: string) {
    try {
      const filePath = path.resolve(__dirname, '..', 'uploads');
      const fullPath = path.join(filePath, fileName);

      if (!fs.existsSync(fullPath)) throw new NotFoundException('Файл не найден');
      fs.rmSync(fullPath);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при удалении файла');
    }
  }
}
