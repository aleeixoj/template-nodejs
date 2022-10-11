import { IPatternBlockDTO } from '@shared/dto/IPatternBlock.dto';
import { IFindAll } from '@shared/interfaces';
import { IDefaultRepository } from '@shared/interfaces/IDefault.repo';
import { IHandleArgs } from '@shared/interfaces/IHandleArgs.iface';

interface IPatternBlockRepository extends IDefaultRepository {
  create(data: IPatternBlockDTO, args: IHandleArgs): Promise<any>;
  findById(id: string, args: IHandleArgs): Promise<any>;
  findAll(data: IFindAll): Promise<any[]>;
  update(uuid: string, data: IPatternBlockDTO, args: IHandleArgs): Promise<any>;
  delete(uuid: string): Promise<void>;
  defineModel(model: any): any;
}

export { IPatternBlockRepository };
