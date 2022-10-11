/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'lodash';

export class FilterRelationshipOnRequestBody {
  static async execute(data: any) {
    _.map(data, (item, key) => {
      let field: any;
      let relation: any;
      if (key.includes('uuid_')) {
        // eslint-disable-next-line prefer-destructuring
        field = key.split('uuid_')[1];
      }
      // eslint-disable-next-line no-return-assign
      _.map(data, (item, key) =>
        key === field ? (relation = key) : undefined
      );

      if (relation !== undefined) {
        data[relation] = undefined;
        delete data[relation];
      }
    });
  }
}
