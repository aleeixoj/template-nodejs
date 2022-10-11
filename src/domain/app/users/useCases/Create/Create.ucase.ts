/* eslint-disable no-param-reassign */
import { hash } from 'bcrypt';
import _ from 'lodash';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IApiDataOut } from '@shared/interfaces/IApiDataOut.iface';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { DefaultCreateUseCase } from '@shared/useCase/create/defaultCreate.ucase';

import { IUserRepository } from '../../infra/prisma/interfaces';
import { IUserDTO } from '../../interfaces';
import { UserMap } from '../../mappers/UserMap';

@injectable()
class CreateUserUseCase extends DefaultCreateUseCase {
  domainRepository: IUserRepository;
  constructor(
    @inject('UserRepository')
    repository: IUserRepository
  ) {
    super(repository);
    this.domainRepository = repository;
  }
  async execute(
    { name, email, password }: IUserDTO,
    args?: IHandleArgs
  ): Promise<IApiDataOut> {
    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.domainRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists', 500, new Error());
    }
    const dbData = await super.execute(
      {
        name,
        email,
        password: passwordHash,
      },
      args
    );

    dbData.data.items = [UserMap.toDTO(dbData.data.items[0])];
    return dbData;
  }
}
export { CreateUserUseCase };
