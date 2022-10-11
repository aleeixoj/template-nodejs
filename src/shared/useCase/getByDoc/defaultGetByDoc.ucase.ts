import _ from 'lodash';

import { AppError } from '@shared/errors/AppError';
import { IDbDataOut } from '@shared/interfaces/IDbDataOut.iface';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';
import { apiPattern } from '@shared/utils/api.pattern';

class DefaultGetByDocUseCase {
  constructor(private repository: any) {
    //
  }
  async execute(column: string, doc: string, args?: IHandleArgs): Promise<any> {
    const dbData = await this.repository.findByDoc(column, doc, args);
    const total = dbData.length;
    const filtered = total;
    const dataOut: IDbDataOut = {
      filtered,
      total,
      items: dbData,
    };
    return apiPattern(dataOut);
  }
}
export { DefaultGetByDocUseCase };
