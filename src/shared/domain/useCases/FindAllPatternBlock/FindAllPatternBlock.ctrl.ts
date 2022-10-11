import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import { IFindAll } from '@shared/interfaces';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { DefaultGetAllController } from '@shared/useCase/getAll/defaultGetAll.ctrl';

import { FindAllPatternBlockUseCase } from './FindAllPatternBlock.ucase';

class FindAllPatternBlockController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
    args: IHandleArgs
  ): Promise<Response> {
    const fields = request?.query?.fields || undefined;
    let order: any = request?.query?.order || undefined;
    const limit = request?.query?.limit || undefined;
    const page = request?.query?.page || undefined;
    const search = request?.query?.search || undefined;

    order = order !== undefined ? order.split(':') : ['created_at', 'desc'];

    const [orderField, orderMethod] = order;
    const useCase: any = container.resolve(FindAllPatternBlockUseCase);

    const dbData = await useCase.defineModel(args.modelName).execute({
      ...args,
      fields,
      orderBy: order ? { [orderField]: orderMethod } : undefined,
      search,
      limit,
      page,
    });
    return response.status(200).send(dbData);
  }
}
export { FindAllPatternBlockController };
