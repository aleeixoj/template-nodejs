import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';

class DefaultGetByDocController {
  constructor(private ucase: any) {
    //
  }

  async handle(
    request: Request,
    response: Response,
    next?: NextFunction,
    args?: IHandleArgs
  ): Promise<Response> {
    const { column, doc } = request?.params;

    const useCase: any = container.resolve(this.ucase);
    const dbData = await useCase.execute(column, doc, args);

    return response.status(200).send(dbData);
  }
}

export { DefaultGetByDocController };
