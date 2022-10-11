/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import { prisma } from 'database/prismaClient';
import _ from 'lodash';

import { IDefaultRepository } from '@shared/interfaces/IDefault.repo';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { InspectUtil } from '@shared/utils/inspect.util';

import { SearchUtil } from '../utils/search.util';

const prismaModels: any = prisma;

class DefaultRepository implements IDefaultRepository {
  model: any;
  modelName: any;
  defineModel(modelName: string, modelObject = 'model'): DefaultRepository {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: any = this;
    self[modelObject] = prismaModels[modelName];
    self.modelName = modelName;
    return self;
  }

  setRepository(model: any) {
    this.model = model;
  }

  async create(data: any, args: IHandleArgs): Promise<any> {
    const include: any = args?.include ? args.include : undefined
    const dbData = await this.model.create({
      data,
      include,
    });
    return dbData;
  }

  async findById(uuid: string, args?: IHandleArgs): Promise<any[]> {
    const include: any = args?.include ? args.include : undefined;
    const dbData = await this.model.findFirst({
      where: { uuid },
      include,
    });
    return dbData as any;
  }
  async findByDoc(
    column: string,
    doc: string,
    args?: IHandleArgs
  ): Promise<any[]> {
    const include: any = args?.include ? args.include : undefined;

    const dbData = await this.model.findFirst({
      where: { [column]: doc },
      include,
    });
    return [dbData] as any[];
  }
  async findAll(args: IHandleArgs): Promise<any[]> {
    args.modelName = this.modelName;
    args.search =
      args?.search !== undefined
        ? await SearchUtil.execute(
          args.search,
          args.fields,
          args.modelName,
          args.include
        )
        : {};
    const include: any = args?.include ? args.include : undefined;

    const dbData = await this.model.findMany({
      where: args.search,
      orderBy:
        args?.orderBy !== undefined ? args.orderBy : [{ created_at: 'desc' }],
      include,
      take: args?.limit !== undefined ? Number(args?.limit) : 99999999,
      skip: args?.page ? args?.page * args?.limit : undefined,
    });

    return dbData;
  }

  async getTotal(): Promise<any> {
    let total = await this.model.findMany({
      select: { uuid: true },
    });
    total = !_.isNil(total.length) ? total.length : 0;
    return total;
  }

  async getTotalFiltered(args: IHandleArgs): Promise<any> {
    let filtered = await this.model.findMany({
      where: args?.search !== undefined ? args?.search : {},
      select: { uuid: true },
    });

    filtered = !_.isNil(filtered.length) ? filtered.length : 0;
    return filtered;
  }

  async update(uuid: string, data: any, args?: IHandleArgs): Promise<any> {
    const include: any = args?.include ? args.include : undefined;

    const dbData = await this.model.update({
      where: {
        uuid,
      },
      data,
      include,
    });

    return dbData as any;
  }

  async delete(uuid: string): Promise<void> {
    await this.model.delete({ where: { uuid } });
  }
}

export { DefaultRepository };
