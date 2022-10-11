import { NextFunction, Request, Response } from 'express';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { DefaultCreateController } from '@shared/useCase/create/defaultCreate.ctrl';

import { CreateUserUseCase } from './Create.ucase';

class CreateUserController extends DefaultCreateController {
  constructor() {
    super(CreateUserUseCase);
  }
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
    args: IHandleArgs
  ): Promise<Response> {
    return super.handle(request, response, next, args);
  }
}
export { CreateUserController };
