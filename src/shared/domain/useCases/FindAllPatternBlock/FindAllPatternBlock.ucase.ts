/* eslint-disable @typescript-eslint/no-explicit-any */
import { container, inject, injectable } from 'tsyringe';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { IPatternBlockRepository } from '@shared/interfaces/IPatternBlock.repo';
import { DefaultGetAllUseCase } from '@shared/useCase/getAll/defaultGetAll.ucase';

import { FindAllPatternBlockMapper } from './FindAllPatternBlock.mapper';

@injectable()
class FindAllPatternBlockUseCase extends DefaultGetAllUseCase {
  modelName = '';
  domainRepository: any;

  constructor(
    @inject('PatternBlockRepository')
    repository: IPatternBlockRepository | any
  ) {
    super(repository);
    console.log('REPOSITORY', repository);

    this.domainRepository = repository;
  }

  async execute(args: IHandleArgs): Promise<any> {
    const mapper = container.resolve(FindAllPatternBlockMapper);
    this.domainRepository.defineModel(this.modelName);
    const dados = await super.execute(args);
    const dadosMapeados = await mapper.execute(dados);
    return dadosMapeados;
  }

  defineModel(modelName: string): FindAllPatternBlockUseCase {
    this.modelName = modelName;
    return this;
  }
}
export { FindAllPatternBlockUseCase };
