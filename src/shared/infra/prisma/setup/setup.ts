/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import fs from 'fs';
import path from 'path';

import { Command } from '@shared/utils/commands/commands.util';

const common = new Command();

class Setup {

  templateFilePath = `${__dirname}/../../../../../prisma/template.prisma`;
  schemaFilePath = `${__dirname}/../../../../../prisma/schema.prisma`;
  templateModelPath = `${__dirname}/../templates/default-model.template.prisma`;
  fullContent = fs.readFileSync(this.templateFilePath).toString();
  defaultModelTemplate = fs.readFileSync(this.templateModelPath).toString();

  constructor() { }

  async setup(): Promise<boolean> {
    const domain_path: string = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'domain'
    );
    const files = this.getAllFiles(domain_path, ['.model.prisma']);
    await this.processModels(files);
    await this.execsCommands();

    return true;

  }

  async execsCommands(): Promise<boolean> {
    // const prismaExec = common.execute('yarn prisma migrate dev'); // Aguarda uma resposta para o processo de remoção de tabelas
    let prismaExec = true;
    if (process.env.DATABASE_PROVIDER !== 'mongodb') {
      prismaExec = common.execute('yarn prisma migrate dev ?y'); // Responde YES automaticamente para perguntas no processo
    }
    const prismaGenerate = common.execute('yarn prisma generate');

    if (prismaExec && prismaGenerate) {
      return true
    }
    return false;
  }

  async processModels(files: string[]): Promise<void | boolean> {
    files.map((file: string) => {
      this.readPrismaModel(file);
      return true;
    });

    this.savePrismaSchema();
  }

  savePrismaSchema(): void {
    this.fullContent = this.configTemplate(this.fullContent);
    fs.writeFileSync(this.schemaFilePath, this.fullContent);
  }

  configTemplate(fullContent: string): string {
    let novoContent = '';
    fullContent.split(/\r?\n/).map((line: string) => {
      if (line.includes('DATABASE_PROVIDER')) {
        line = line.toString().replace("DATABASE_PROVIDER", process.env.DATABASE_PROVIDER);
      }
      novoContent += `${line}\n`;
      return true;
    });
    return novoContent;
  }

  readPrismaModel(file: string): void {
    const content = fs.readFileSync(file).toString();
    // const [head, attr] = content.split('{');
    const head: string[] = [];
    const attr: string[] = [];
    const footer: string[] = [];
    const map: string[] = [];
    let defaultModelTemplate = ``;
    let jump = 0;
    let cont = 0;
    this.defaultModelTemplate.split('\n').forEach((line: string) => {
      if (line.includes('datasource db')) {
        jump = 3;
        cont += 1;
        line = '';
        return false;
      }
      if (cont < jump) {
        cont += 1;
      } else if (line.length === 0) {
        return false;
      } else {
        defaultModelTemplate += `${line}\n`;
      }

      return true;
    });

    let modelName: any = '';
    content.split(/\r?\n/).forEach((line) => {
      // console.log(line);
      if (line.includes('datasource db')) {
        jump = 4;
        cont += 1;
        line = '';
        return false;
      }

      if (cont < jump) {
        cont += 1;
      } else if (line.length === 0) {
        return false;
      } else if (line.includes('{')) {
        let modelLine: any = line.trim();
        modelLine = modelLine.replace(/' {2}'/g, ' ');
        modelLine = modelLine.split(' ');
        modelName = modelLine[1];
        head.push(`${line}\n`);
      }
      else if (line.includes('@@map')) {
        const tableName: any = line.split('"')[1] || '';
        // console.log('TABELA', tableName);

        const glob: any = global;
        glob.models = glob.models ? glob.models : {} as any;
        glob.models[tableName] = modelName;

        map.push(`\n${line}`);
      }

      else if (line.includes('}')) {
        footer.push(`\n${line}`);

      } else {
        attr.push(`${line}\n`);
      }
      return true;
    });

    const strHead = head.join('');
    const strFooter = footer.join('');
    const strMap = map.join('');

    let fullAttr = attr.join('');
    fullAttr = defaultModelTemplate.replace('CUSTOM-ATTRIBUTES', fullAttr);

    const model = `${strHead}${fullAttr}${strMap}${strFooter}

    
`;

    this.fullContent += model;
  }



  getAllFiles(
    dirPath: string,
    filter: string[] = [],
    arrayOfFiles: Array<any> = []
  ): Array<any> {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
        arrayOfFiles = this.getAllFiles(
          `${dirPath}/${file}`,
          filter,
          arrayOfFiles
        );
      } else if (filter.length > 0) {
        filter.map((item) => {
          const targetFile = file.split('.');
          const targetFilter = item.split('.');
          if (
            targetFilter[targetFilter.length - 2] ===
            targetFile[targetFile.length - 2] &&
            targetFilter[targetFilter.length - 1] ===
            targetFile[targetFile.length - 1]
          ) {
            arrayOfFiles.push(path.join(dirPath, '/', file));
          }
          return true;
        });
      }
    });

    return arrayOfFiles;
  }



}

export { Setup };
