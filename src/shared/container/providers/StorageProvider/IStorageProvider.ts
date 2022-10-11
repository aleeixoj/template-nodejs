import { GetObjectOutput } from 'aws-sdk/clients/s3';

interface IStorageProvider {
  save(file: string): Promise<string>;
  delete(file: string): Promise<void>;
  getFile(file: string): Promise<any>;
}

export { IStorageProvider };
