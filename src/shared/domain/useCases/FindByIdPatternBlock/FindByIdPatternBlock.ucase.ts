/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'tsyringe';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { IPatternBlockRepository } from '@shared/interfaces/IPatternBlock.repo';
import { DefaultGetByIdUseCase } from '@shared/useCase/getById/defaultGetById.ucase';

@injectable()
class FindByIdPatterBlockUseCase extends DefaultGetByIdUseCase {
  modelName = '';
  domainRepository: any;

  constructor(
    @inject('PatternBlockRepository')
    repository: IPatternBlockRepository | any
  ) {
    super(repository);
    this.domainRepository = repository;
  }

  async execute(uuid: string, args?: IHandleArgs): Promise<any> {
    this.domainRepository.defineModel(this.modelName);
    const dbData = await super.execute(uuid, args);
    return dbData;
  }

  defineModel(modelName: string): FindByIdPatterBlockUseCase {
    this.modelName = modelName;
    return this;
  }
}
export { FindByIdPatterBlockUseCase };
