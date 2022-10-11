import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { IFindAll } from '@shared/interfaces';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
// import { SearchUtil } from '@shared/utils/search.util';

class DefaultGetAllController {
  constructor(private ucase: any) {
    //
  }

  async handle(
    request: Request,
    response: Response,
    next?: NextFunction,
    args?: IHandleArgs
  ): Promise<Response> {
    const { fields, order, limit, page, search } = request?.query as IFindAll;

    const orderField = order?.split(':')[0];
    const orderMethod = order?.split(':')[1];

    const useCase: any = container.resolve(this.ucase);
    const dbData = await useCase.execute({
      fields,
      orderBy: order ? { [orderField]: orderMethod } : undefined,
      search,
      limit,
      page,
      modelName: args?.modelName || '',
      plural: args?.plural || '',
      singular: args?.singular || '',
      include: args?.include,
    });

    return response.status(200).send(dbData);
  }
}

export { DefaultGetAllController };
