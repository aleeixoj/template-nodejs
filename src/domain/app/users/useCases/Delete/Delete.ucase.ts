import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@domain/app/users/infra/prisma/interfaces';
import { IApiDataOut } from '@shared/interfaces/IApiDataOut.iface';
import { DefaultDeleteUseCase } from '@shared/useCase/delete/defaultDelete.ucase';

@injectable()
class DeleteUserUseCase extends DefaultDeleteUseCase {
  domainRepository: IUserRepository;
  constructor(
    @inject('UserRepository')
    repository: IUserRepository
  ) {
    super(repository);
    this.domainRepository = repository;
  }
  async execute(uuid: string): Promise<IApiDataOut> {
    return super.execute(uuid);
  }
}
export { DeleteUserUseCase };
