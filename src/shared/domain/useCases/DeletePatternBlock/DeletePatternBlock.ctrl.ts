import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';

import { DeletePatternBlockUseCase } from './DeletePatternBlock.ucase';

class DeletePatternBlockController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
    args: IHandleArgs
  ): Promise<Response> {
    const { uuid } = request.params;
    const useCase = container.resolve(DeletePatternBlockUseCase);
    const dbData = await useCase.defineModel(args.modelName).execute(uuid);
    return response.status(200).send(dbData);
  }
}
export { DeletePatternBlockController };
