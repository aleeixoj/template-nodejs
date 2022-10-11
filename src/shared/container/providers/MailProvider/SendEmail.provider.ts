import fs from 'fs';
import handlebars from 'handlebars';
import mailer from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailBody } from './interfaces/IMailBody.iface';
import { ISendEmailProvider } from './interfaces/ISendEmailProvider.iface';

@injectable()
class SendEmailProvider implements ISendEmailProvider {
  transport: any;
  constructor() {
    // eslint-disable-next-line prefer-destructuring
    const env: any = process.env;
    this.transport = mailer.createTransport({
      host: env.MAIL_SMTP_HOST,
      port: env.MAIL_SMTP_PORT,
      auth: {
        user: env.MAIL_SMTP_USER,
        pass: env.MAIL_SMTP_PASS,
      },
      tls: { rejectUnauthorized: env.MAIL_SMTP_TLS },
    });
  }

  execute(mailBody: IMailBody): boolean {
    if (mailBody.path) {
      const templateFileContent = fs
        .readFileSync(mailBody.path)
        .toString('utf-8');

      const templateParse = handlebars.compile(templateFileContent);
      const templateHtml = templateParse(mailBody.variables);
      mailBody.html = templateHtml;
    }

    return this.transport.sendMail(mailBody, (error: any, info: any) => {
      if (error) {
        console.log('ERROR SMTP', error);
        return false;
      }
      console.log('E-mail enviado:', info.response);
      return true;
    });
  }
}

export { SendEmailProvider };
