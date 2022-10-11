import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@domain/app/users/infra/prisma/interfaces';
import { IApiDataOut } from '@shared/interfaces/IApiDataOut.iface';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { DefaultGetAllUseCase } from '@shared/useCase/getAll/defaultGetAll.ucase';

import { UserMap } from '../../mappers/UserMap';

@injectable()
class FindAllUsersUseCase extends DefaultGetAllUseCase {
  domainRepository: IUserRepository;
  constructor(
    @inject('UserRepository')
    repository: IUserRepository
  ) {
    super(repository);
    this.domainRepository = repository;
  }

  async execute(args?: IHandleArgs): Promise<IApiDataOut> {
    const dbData = await super.execute(args);
    dbData.data.items = dbData.data.items.map((item) => UserMap.toDTO(item));
    return dbData;
  }
}
export { FindAllUsersUseCase };
