/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IDbDataOut } from '@shared/interfaces/IDbDataOut.iface';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { apiPattern } from '@shared/utils/api.pattern';

class DefaultGetByIdUseCase {
  constructor(private repository: any) {
    //
  }
  async execute(uuid: string, args?: IHandleArgs): Promise<any> {
    const dbData = await this.repository.findById(uuid, args);
    const total = dbData.length;
    const filtered = total;

    const dataOut: IDbDataOut = {
      filtered,
      total,
      items: [dbData],
    };
    return apiPattern(dataOut);
  }
}
export { DefaultGetByIdUseCase };
