/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';

class DefaultDeleteController {
  constructor(private ucase: any) {
    //
  }

  async handle(
    request: Request,
    response: Response,
    next?: NextFunction,
    args?: IHandleArgs
  ): Promise<Response> {
    const { uuid } = request.params;
    const useCase: any = container.resolve(this.ucase);

    const dbData = await useCase.execute(uuid);

    return response.status(201).send(dbData);
  }
}

export { DefaultDeleteController };
