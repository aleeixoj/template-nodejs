import fs from 'fs';
import { resolve } from 'path';

import upload from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async getFile(file: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async save(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}`, file)
    );

    return file;
  }
  async delete(file: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
