import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';

import { UpdatePatternBlockUseCase } from './UpdatePatternBlock.ucase';

class UpdatePatternBlockController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
    args: IHandleArgs
  ): Promise<Response> {
    const useCase: any = container.resolve(UpdatePatternBlockUseCase);
    const { body } = request;
    const { uuid } = request.params;
    body.uuid = undefined;

    const dbData = await useCase
      .defineModel(args.modelName)
      .execute(uuid, body, args);

    return response.status(200).send(dbData);
  }
}
export { UpdatePatternBlockController };
