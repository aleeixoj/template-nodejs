/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { prisma } from 'database/prismaClient';
import _ from 'lodash';
import { injectable } from 'tsyringe';

import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { IPatternBlockRepository } from '@shared/interfaces/IPatternBlock.repo';
import { InspectUtil } from '@shared/utils/inspect.util';

import { IPatternBlockDTO } from '../../../dto/IPatternBlock.dto';
import { SearchUtil } from '../utils/search.util';

const prismaModels: any = prisma;
@injectable()
class PatternBlockRepository implements IPatternBlockRepository {

  model: any;
  modelName: any;

  defineModel(modelName: string, modelObject = 'model'): PatternBlockRepository {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: any = this;
    self[modelObject] = prismaModels[modelName];
    self.modelName = modelName;
    return self;
  }

  setRepository(model: any) {
    this.model = model;
  }

  async create(data: IPatternBlockDTO, args: IHandleArgs): Promise<any> {
    const model = this.model;
    const include: any = args?.include ? args.include : undefined;

    const createSolidDefault = await model.create({
      data,
      include,
    });

    return createSolidDefault;
  }

  async findById(uuid: string, args: IHandleArgs): Promise<any> {
    const model = this.model;
    const include: any = args?.include ? args.include : undefined;
    const solidDefault = await model.findFirst({
      where: { uuid },
      include,
    });
    return solidDefault as any;
  }

  async findAll(args: IHandleArgs): Promise<any[]> {
    const model = this.model;
    args.modelName = this.modelName
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

    const dbData = await model.findMany({
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
    const model = this.model;
    const total = await model.findMany({
      select: { uuid: true },
    });
    return total.length;
  }

  async getTotalFiltered(args: IHandleArgs): Promise<any> {
    let filtered = await this.model.findMany({
      where: args?.search !== undefined ? args?.search : {},
      select: { uuid: true },
    });

    filtered = !_.isNil(filtered.length) ? filtered.length : 0;
    return filtered;
  }

  async update(
    uuid: string,
    data: IPatternBlockDTO,
    args: IHandleArgs
  ): Promise<any> {
    const model = this.model;
    const include: any = args?.include ? args.include : undefined;
    data.uuid = undefined;
    const updateSolidDefault = await model.update({
      where: {
        uuid,
      },
      data,
      include,
    });

    return updateSolidDefault;
  }

  async delete(uuid: string): Promise<void> {
    const model = this.model;
    await model.delete({ where: { uuid } });
  }
}

export { PatternBlockRepository };
