import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';

import { FindByIdPatterBlockUseCase } from './FindByIdPatternBlock.ucase';

class FindByIdPatternBlockController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
    args: IHandleArgs
  ): Promise<Response> {
    const { uuid } = request.params;

    const useCase = container.resolve(FindByIdPatterBlockUseCase);
    const dbData = await useCase
      .defineModel(args.modelName)
      .execute(uuid, args);

    return response.status(200).send(dbData);
  }
}
export { FindByIdPatternBlockController };
