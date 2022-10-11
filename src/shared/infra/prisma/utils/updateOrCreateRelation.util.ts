/* eslint-disable no-param-reassign */
import { prisma } from 'database/prismaClient';

export abstract class UpdateOrCreateRelation {
  static async execute(
    model: string,
    data: any,
    dadField: string,
    dadUUID: string
  ): Promise<void> {
    const prismaModel = prisma[model];

    data.map(async (item: any) => {
      if (item.uuid) {
        item[dadField] = dadUUID;
        const newData = { ...item };
        newData.uuid = undefined;
        await prismaModel.update({
          where: { uuid: item.uuid },
          data: newData,
        });
      } else {
        item[dadField] = dadUUID;
        await prismaModel.create({
          data: item,
        });
      }
    });
  }
}
