/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { inject, injectable } from 'tsyringe';

import { IApiDataOut } from '@shared/interfaces/IApiDataOut.iface';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { DefaultUpdateUseCase } from '@shared/useCase/update/defaultUpdate.ucase';

import { IUserDTO } from '../../interfaces';
import { IUserRepository } from '../../infra/prisma/interfaces';

@injectable()
class UpdateUserUseCase extends DefaultUpdateUseCase {
  domainRepository: IUserRepository;
  constructor(
    @inject('UserRepository')
    repository: IUserRepository
  ) {
    super(repository);
    this.domainRepository = repository;
  }
  async execute(
    uuid: string,
    data: IUserDTO,
    args: IHandleArgs
  ): Promise<IApiDataOut> {

    return super.execute(uuid, data, args);
  }
}
export { UpdateUserUseCase };
