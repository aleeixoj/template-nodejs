import { NextFunction, Request, Response } from 'express';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { DefaultGetByIdController } from '@shared/useCase/getById/defaultGetById.ctrl';

import { FindUserByIdUseCase } from './FindById.ucase';

class FindUserByIdController extends DefaultGetByIdController {
  constructor() {
    super(FindUserByIdUseCase);
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
export { FindUserByIdController };
