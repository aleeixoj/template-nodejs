import { IUserDTO } from '@domain/app/users/interfaces';
import { user } from '@prisma/client';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';

interface IUserRepository {
  create(data: IUserDTO, args?: IHandleArgs): Promise<user>;
  findById(uuid: string, args?: IHandleArgs): Promise<user[]>;
  findAll(args: IHandleArgs): Promise<user[]>;
  update(uuid: string, data: IUserDTO, args: IHandleArgs): Promise<user>;
  delete(uuid: string): Promise<void>;
  findByEmail(email: string): Promise<user>;
}

export { IUserRepository };
