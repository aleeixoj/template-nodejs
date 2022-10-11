/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiDataOut } from '@shared/interfaces/IApiDataOut.iface';
import { IDbDataOut } from '@shared/interfaces/IDbDataOut.iface';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { apiPattern } from '@shared/utils/api.pattern';

class DefaultGetAllUseCase {
  constructor(private repository: any) {
    //
  }

  async execute(args?: IHandleArgs): Promise<IApiDataOut> {
    const dbData = await this.repository.findAll(args);
    const total = await this.repository.getTotal();
    const filtered = await this.repository.getTotalFiltered(args);
    const dataOut: IDbDataOut = {
      filtered,
      total,
      items: dbData,
    };

    return apiPattern(dataOut);
  }
}
export { DefaultGetAllUseCase };
