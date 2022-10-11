import AWS, { S3 } from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import upload from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_BUCKET_REGION,
    });

    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }
  async save(file: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);
    const ContentType = mime.getType(originalName) as string;
    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalName);
    return file;
  }
  async delete(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: file,
      })
      .promise();
  }

  async getFile(file: string): Promise<any> {
    let object;
    await this.client
      .getObject(
        {
          Bucket: `${process.env.AWS_BUCKET}`,
          Key: `${file}`,
        },
        async (err: Error, result: GetObjectOutput) => {
          if (err) {
            console.error(err);
          }
          object = result;
        }
      )
      .promise();
    return object;
  }
}

export { S3StorageProvider };
