/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { prisma } from 'database/prismaClient';
import _ from 'lodash';

import { InspectUtil } from '@shared/utils/inspect.util';
import stringUtil from '@shared/utils/string/string.util';

export abstract class SearchUtil {
  static async execute(
    search: string,
    fields: any,
    model: any,
    include: any
  ): Promise<any> {
    const prismaModels: any = prisma;
    if (_.isNil(prismaModels[model])) {
      return {};
    }

    if (fields === '*') {
      const data = await prismaModels[model].findMany({ include });
      fields = this.setFields(data[0]);
    }

    if (search !== null) {
      const where = {};

      _.map(_.split(search, ','), (item: any) => {
        if (item.match(/\w*:(\[(.*?)\])/g)) {
          // example: or:[id:like:1|id:3]
          const conditional = item.split(/\s*:\[(.*?)\]/g);
          const op = conditional[0].toUpperCase();
          const listSearch: any = [];
          conditional[1].split('|').map((item: any) => {
            item = item.split(':');
            const validate = this.validateValue(item[1]);
            if (item.length === 5) {
              listSearch.push({
                [item[0]]: {
                  [item[1]]: item[2],
                  [item[3]]: item[4] === 'undefined' ? undefined : item[4],
                },
              });
            } else if (item.length === 3) {
              // item[1] = item[1].toString().toUpperCase();
              listSearch.push({
                [item[0]]: {
                  [item[1]]: item[2],
                  mode: 'insensitive',
                },
              });
            } else {
              listSearch.push({
                [item[0]]: {
                  [validate.op]: validate.value,
                  mode: validate.mode,
                },
              });
            }
          });

          Object.assign(where, { [op]: listSearch });
        } else if (item.match(/\w*:\w*(:\w*)?/g)) {
          const listSearch: any = [];
          item = item.split(':');
          const validate = this.validateValue(item[1]);

          if (item.length === 5) {
            listSearch.push({
              [item[0]]: {
                [item[1]]: item[2],
                [item[3]]: item[4] === 'undefined' ? undefined : item[4],
              },
            });
          } else if (item.length === 3) {
            listSearch.push({
              [item[0]]: {
                [item[1]]: item[2],
                mode: 'insensitive',
              },
            });
          } else {
            listSearch.push({
              [item[0]]: {
                [validate.op]: validate.value,
                mode: validate.mode,
              },
            });
          }

          Object.assign(where, { OR: listSearch });
        } else if (item.match(/\w*\.\w*(:\w*)/g)) {
          const listSearch: any = [];
          // eslint-disable-next-line prefer-const

          let [fields, value] = item.split(':');

          fields = fields.split('.');
          console.log(fields);
          if (fields.length >= 2) {
            listSearch.push({
              [fields[0]]: {
                [fields[1]]: {
                  contains: value,
                  mode: 'insensitive',
                },
              },
            });
          } else {
            listSearch.push({
              [fields[0]]: {
                contains: value,
                mode: 'insensitive',
              },
            });
          }
          const inst = new InspectUtil();
          inst.inspect('lista', listSearch);
          Object.assign(where, { OR: listSearch });
        } else if (!_.isNil(fields)) {
          console.log('FIELDS', fields);
          if(_.isString(fields)){
            fields = stringUtil.replaceAll(fields, ' ,', ',');
            fields = stringUtil.replaceAll(fields, ', ', ',');
            fields = fields.split(',');
          }
          const listSearch: any = [];
          fields.map((field: any) => {
            if (field.type === 'string') {
              listSearch.push(this.fieldTypeString(field, item));
            }
            if (field.type === 'number') {
              const searchItem = Number(item);
              if (!_.isNaN(searchItem)) {
                listSearch.push(this.fieldTypeNumber(field, searchItem));
              }
            }
            if (field.key === 'created_at' || field.key === 'updated_at') {
              field.type = 'date';
              const newDate = new Date(item);
              if (this.isValidDate(newDate)) {
                listSearch.push(this.fieldTypeDate(field, newDate));
              }
            }

            if (
              field.type === 'object' &&
              !_.isNil(field.item) &&
              !_.isEmpty(field.item)
            ) {
              const assoc = this.setFields(field.item);
              listSearch.push({
                [field.key]: { OR: this.fieldTypeObject(assoc, item) },
              });
            }
          });
          Object.assign(where, { OR: listSearch });
        }
      });

      return where;
    }

    return search;
  }

  static validateValue(value: any) {
    let op = 'contains';
    let mode: any = 'insensitive';
    const valueToNumber = Number(value);
    if (!_.isNaN(valueToNumber)) {
      op = 'equals';
      value = valueToNumber;
      mode = undefined;
    }

    return {
      op,
      value,
      mode,
    };
  }

  static setFields(data: any): any {
    const tst: any[] = [];
    _.map(data, (item, key) => {
      tst.push({ key, type: typeof item, item });
    });
    return tst;
  }
  static isValidDate(d: any): boolean {
    // eslint-disable-next-line no-restricted-globals
    return d instanceof Date && !isNaN(d);
  }
  static fieldTypeString(field: any, item: any) {
    return { [field.key]: { contains: `${item}`, mode: 'insensitive' } };
  }
  static fieldTypeDate(field: any, item: any) {
    return { [field.key]: { equals: item } };
  }
  static fieldTypeObject(assoc: any, item: any) {
    const listAssoc: any = [];

    _.map(assoc, (association: any) => {
      if (association.type === 'string') {
        listAssoc.push(this.fieldTypeString(association, item));
      }
      if (association.type === 'number') {
        const searchItem = Number(item);
        if (!_.isNaN(searchItem)) {
          listAssoc.push(this.fieldTypeNumber(association, searchItem));
        }
      }
      if (
        association.key === 'created_at' ||
        association.key === 'updated_at'
      ) {
        association.type = 'date';
        const newDate = new Date(item);
        if (this.isValidDate(newDate)) {
          listAssoc.push(this.fieldTypeDate(association, newDate));
        }
      }
      if (association.type === 'object' && association.item !== null) {
        listAssoc.push({ OR: this.fieldTypeObject(association, item) });
      }
    });

    return listAssoc;
  }

  static fieldTypeNumber(field: any, item: any) {
    return { [field.key]: { equals: Number(item) } };
  }
}
