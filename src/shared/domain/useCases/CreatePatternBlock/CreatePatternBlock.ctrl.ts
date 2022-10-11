import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';

import { CreatePatternBlockUseCase } from './CreatePatternBlock.ucase';

class CreatePatternBlockController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
    args: IHandleArgs
  ): Promise<Response> {
    const { body } = request;
    body.uuid = undefined;

    const useCase = container.resolve(CreatePatternBlockUseCase);

    const dados = await useCase.defineModel(args.modelName).execute(body, args);

    return response.status(201).send(dados);
  }
}
export { CreatePatternBlockController };
