/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'lodash';

abstract class PrepareS2NRelation {
  static execute(data: any, attribIN: string, attribOut: string): any {
    const novoDado: any = { ...data };
    if (_.isUndefined(novoDado[attribOut])) {
      novoDado[attribOut] = novoDado[attribIN].uuid;
    }
    delete novoDado[attribIN];
    return novoDado;
  }
}

export { PrepareS2NRelation };
