import { instanceToInstance } from 'class-transformer';

import { user } from '@prisma/client';

import { IUserResponseDTO } from '../interfaces';

class UserByIdMap {
  static toDTO({
    email,
    name,
    uuid,
    avatar,
    created_at,
    status,
    updated_at,
  }: user): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      uuid,
      avatar,
      created_at,
      status,
      updated_at,
    });
    return user;
  }
}

export { UserByIdMap };
