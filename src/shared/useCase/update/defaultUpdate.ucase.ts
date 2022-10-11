/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { IApiDataOut } from '@shared/interfaces/IApiDataOut.iface';
import { IDbDataOut } from '@shared/interfaces/IDbDataOut.iface';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { apiPattern } from '@shared/utils/api.pattern';
import { FilterRelationshipOnRequestBody as filterRelation } from '@shared/utils/filterRelationshipOnRequestBody.util';
import { RemoveDataWhenContainsHtml } from '@shared/utils/removeDataWhenContainsHtml.util';

class DefaultUpdateUseCase {
  constructor(private repository: any) {
    //
  }

  async execute(
    uuid: string,
    data: any,
    args?: IHandleArgs
  ): Promise<IApiDataOut> {
    filterRelation.execute(data);
    RemoveDataWhenContainsHtml.execute(data);
    data.uuid = undefined;
    const dbData = await this.repository.update(uuid, data, args);
    const total = await this.repository.getTotal();
    const filtered = await this.repository.getTotalFiltered(args);
    const dataOut: IDbDataOut = {
      filtered,
      total,
      items: [dbData],
    };
    return apiPattern(dataOut);
  }
}
export { DefaultUpdateUseCase };
