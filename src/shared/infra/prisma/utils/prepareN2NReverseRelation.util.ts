import { prisma } from 'database/prismaClient';
import _ from 'lodash';

abstract class PrepareN2NInverseRelation {
  static async execute(
    data: any,
    model: any,
    uuid: string,
    attribIn: string
  ): Promise<void> {
    const uuids = data[`uuids_${[attribIn]}`];
    delete data[uuids];

    const db = await model.findFirst({
      where: { uuid },
      include: {
        [attribIn]: true,
      },
    });

    const toDisconnect: any = [];
    _.forEach(db[attribIn], async (itemToDisconnect) => {
      toDisconnect.push({ uuid: itemToDisconnect.uuid });
    });

    await model.update({
      where: { uuid },
      data: {
        [attribIn]: {
          disconnect: toDisconnect,
        },
      },
    });

    const toConnect: any = [];
    uuids.forEach((uuid: string) => {
      toConnect.push({ uuid });
    });

    await model.update({
      where: { uuid },
      data: {
        [attribIn]: {
          connect: toConnect,
        },
      },
    });
  }
}

export { PrepareN2NInverseRelation };
