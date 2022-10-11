/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'lodash';

abstract class PrepareS2NDataIn {
  static execute(request: any, args: any): any {
    if (!_.isNil(args.include)) {
      _.map(args.include, (attrib: any, key: string) => {
        if (!_.isUndefined(request.body[key])) {
          delete request.body[key];
        }
      });
    }
    return request;
  }
}

export { PrepareS2NDataIn };
