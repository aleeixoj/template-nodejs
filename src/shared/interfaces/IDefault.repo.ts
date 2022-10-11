import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';

interface IDefaultRepository {
  create(data: any, args: IHandleArgs): Promise<any>;
  findById(id: string, args: IHandleArgs): Promise<any>;
  findAll(data: IHandleArgs): Promise<any[]>;
  update(uuid: string, data: any, args?: IHandleArgs): Promise<any>;
  delete(uuid: string): Promise<void>;
  getTotal(): Promise<any>;
  getTotalFiltered(args?: IHandleArgs): Promise<any>;
  defineModel(model: any): any;
  setRepository(repository: any): void;
}

export { IDefaultRepository };
