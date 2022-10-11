import _ from 'lodash';

export class RemoveDataWhenContainsHtml {
  static async execute(data: any) {
    _.map(data, async (item, key) => {
      let savedData: any;
      if (_.includes(key, '-html')) {
        // eslint-disable-next-line no-param-reassign
        delete data[key];
      }

      if (_.isArray(item) || _.isObject(item)) {
        savedData = await this.execute(item);
        data[key] = savedData;
      }
    });

    return data;
  }
}
