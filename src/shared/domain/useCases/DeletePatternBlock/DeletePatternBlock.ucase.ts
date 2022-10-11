/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'tsyringe';

import { IApiDataOut } from '@shared/interfaces/IApiDataOut.iface';
import { IPatternBlockRepository } from '@shared/interfaces/IPatternBlock.repo';
import { DefaultDeleteUseCase } from '@shared/useCase/delete/defaultDelete.ucase';

@injectable()
class DeletePatternBlockUseCase extends DefaultDeleteUseCase {
  modelName: any;
  domainRepository: any;

  constructor(
    @inject('PatternBlockRepository')
    repository: IPatternBlockRepository
  ) {
    super(repository);
    this.domainRepository = repository;
  }

  async execute(uuid: string): Promise<IApiDataOut> {
    // await this.repository.defineModel(this.modelName).delete(uuid);
    this.domainRepository.defineModel(this.modelName);
    const dbData = await super.execute(uuid);
    return dbData;
  }

  defineModel(modelName: string): DeletePatternBlockUseCase {
    this.modelName = modelName;
    return this;
  }
}
export { DeletePatternBlockUseCase };
