import { instanceToInstance } from 'class-transformer';

import { user } from '@prisma/client';

import { IUserResponseDTO } from '../interfaces';

class UserMap {
  static toDTO({ email, name, uuid }: user): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      uuid,
    });
    return user;
  }
}

export { UserMap };
