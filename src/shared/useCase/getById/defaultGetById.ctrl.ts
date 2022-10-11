/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';

class DefaultGetByIdController {
  constructor(private ucase: any) {
    //
  }

  async handle(
    request: Request,
    response: Response,
    next?: NextFunction,
    args?: IHandleArgs
  ): Promise<Response> {
    const { uuid } = request?.params;

    const useCase: any = container.resolve(this.ucase);
    const dbData = await useCase.execute(uuid, args);

    return response.status(200).send(dbData);
  }
}

export { DefaultGetByIdController };
