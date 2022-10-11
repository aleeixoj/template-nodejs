export interface IMailBody {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: any;
  path?: string;
  variables?: any;
}
