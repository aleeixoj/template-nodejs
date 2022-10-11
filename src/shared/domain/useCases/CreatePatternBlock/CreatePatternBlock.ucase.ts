/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { inject, injectable } from 'tsyringe';

import { IPatternBlockDTO } from '@shared/dto/IPatternBlock.dto';
import { IApiDataOut } from '@shared/interfaces/IApiDataOut.iface';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { IPatternBlockRepository } from '@shared/interfaces/IPatternBlock.repo';
import { DefaultCreateUseCase } from '@shared/useCase/create/defaultCreate.ucase';

@injectable()
class CreatePatternBlockUseCase extends DefaultCreateUseCase {
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
    data: IPatternBlockDTO,
    args?: IHandleArgs
  ): Promise<IApiDataOut> {
    // const solidDefault = await this.repository
    //   .defineModel(this.modelName)
    //   .create(data, args);

    // return solidDefault;

    this.domainRepository.defineModel(this.modelName);
    const dbData = super.execute(data, args);
    return dbData;
  }

  defineModel(modelName: string): CreatePatternBlockUseCase {
    this.modelName = modelName;
    return this;
  }
}
export { CreatePatternBlockUseCase };
