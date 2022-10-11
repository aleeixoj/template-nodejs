import { NextFunction, Request, Response } from 'express';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { DefaultUpdateController } from '@shared/useCase/update/defaultUpdate.ctrl';

import { UpdateUserUseCase } from './Update.ucase';

class UpdateUserController extends DefaultUpdateController {
  constructor() {
    super(UpdateUserUseCase);
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
export { UpdateUserController };
