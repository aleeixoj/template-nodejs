import { NextFunction, Request, Response } from 'express';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { DefaultGetAllController } from '@shared/useCase/getAll/defaultGetAll.ctrl';

import { FindAllUsersUseCase } from './FindAll.ucase';

class FindAllUsersController extends DefaultGetAllController {
  constructor() {
    super(FindAllUsersUseCase);
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
export { FindAllUsersController };
