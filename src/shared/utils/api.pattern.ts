import { IApiDataOut } from '@shared/interfaces/IApiDataOut.iface';

export function apiPattern(data: any, message?: string): IApiDataOut {
  const objReturn = {
    // data: {
    //   items: data,
    //   total: data?.length,
    // },
    data,
    msg: message,
    returned: true,
  };

  return objReturn;
}
