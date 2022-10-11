import { IMailBody } from './IMailBody.iface';

export interface ISendEmailProvider {
  execute(mailBody: IMailBody): void;
}
