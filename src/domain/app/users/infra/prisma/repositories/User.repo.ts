/* eslint-disable no-param-reassign */
import { prisma } from 'database/prismaClient';

import { IUserDTO } from '@domain/app/users/interfaces';
import { user } from '@prisma/client';
import { DefaultRepository } from '@shared/infra/prisma/repositories/Default.repo';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';

import { IUserRepository } from '../interfaces';

class UserRepository extends DefaultRepository implements IUserRepository {
  model: any;
  modelName: any;

  constructor() {
    super();
    this.defineModel('user');
  }
  async findByEmail(email: string): Promise<user> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user as user;
  }

  async create(data: IUserDTO, args: IHandleArgs): Promise<user> {
    const dbData = super.create(data, args);
    return dbData;
  }
  async findById(uuid: string, args?: IHandleArgs): Promise<user[]> {
    const dbData = await super.findById(uuid, args);
    return dbData;
  }

  async findAll(args: IHandleArgs): Promise<user[]> {
    const dbData = await super.findAll(args);
    return dbData;
  }

  async update(
    uuid: string,
    data: IUserDTO,
    args?: IHandleArgs
  ): Promise<user> {
    const dbData = await super.update(uuid, data, args);
    return dbData;
  }

  async delete(uuid: string): Promise<void> {
    await super.delete(uuid);
  }
}

export { UserRepository };
