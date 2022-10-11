import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@domain/app/users/infra/prisma/interfaces';
import { IApiDataOut } from '@shared/interfaces/IApiDataOut.iface';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { DefaultGetByIdUseCase } from '@shared/useCase/getById/defaultGetById.ucase';

import { UserByIdMap } from '../../mappers/UserByIdMap';

@injectable()
class FindUserByIdUseCase extends DefaultGetByIdUseCase {
  domainRepository: IUserRepository;
  constructor(
    @inject('UserRepository')
    repository: IUserRepository
  ) {
    super(repository);
    this.domainRepository = repository;
  }
  async execute(uuid: string, args: IHandleArgs): Promise<IApiDataOut> {
    const rtn = await super.execute(uuid, args);
    rtn.data.items = [UserByIdMap.toDTO(rtn.data.items[0])];
    return rtn;
  }
}
export { FindUserByIdUseCase };
