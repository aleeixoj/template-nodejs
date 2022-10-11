/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'tsyringe';

import { IPatternBlockDTO } from '@shared/dto/IPatternBlock.dto';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { IPatternBlockRepository } from '@shared/interfaces/IPatternBlock.repo';
import { DefaultUpdateUseCase } from '@shared/useCase/update/defaultUpdate.ucase';

@injectable()
class UpdatePatternBlockUseCase extends DefaultUpdateUseCase {
  modelName = '';
  domainRepository: any;

  constructor(
    @inject('PatternBlockRepository')
    repository: IPatternBlockRepository | any
  ) {
    super(repository);
    this.domainRepository = repository;
  }

  async execute(
    uuid: string,
    data: IPatternBlockDTO,
    args?: IHandleArgs
  ): Promise<any> {
    this.domainRepository.defineModel(this.modelName);
    const dbData = await super.execute(uuid, data, args);
    return dbData;
  }

  defineModel(modelName: string): UpdatePatternBlockUseCase {
    this.modelName = modelName;
    return this;
  }
}
export { UpdatePatternBlockUseCase };
