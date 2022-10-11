import { NextFunction, Request, Response } from 'express';

import { DefaultDeleteController } from '@shared/useCase/delete/defaultDelete.ctrl';

import { DeleteUserUseCase } from './Delete.ucase';

class DeleteUserController extends DefaultDeleteController {
  constructor() {
    super(DeleteUserUseCase);
  }
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    return super.handle(request, response, next);
  }
}
export { DeleteUserController };
