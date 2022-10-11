import { IDefaultDTO } from '@shared/dto/default.dto';

export interface IUserDTO extends IDefaultDTO {
  name: string;
  email: string;
  password: string;
}
