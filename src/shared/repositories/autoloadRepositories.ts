import _ from 'lodash';
import { container } from 'tsyringe';

import searchFiles from '@shared/utils/files/searchFiles.util';

class AutoLoadRepositories {
  execute(): void {
    // CARREGANDO REPOSITORIES DA PASTA DOMAIN
    const files = searchFiles.getAllFiles({}, `${__dirname}/../../domain`, [
      '.repo.ts',
    ]);
    this.loadRepositories(files);

    // CARREGANDO REPOSITORIES DA PASTA SHARED
    const sfiles = searchFiles.getAllFiles({}, `${__dirname}/../../shared`, [
      '.repo.ts',
    ]);
    this.loadRepositories(sfiles);
  }

  loadRepositories(files: any[] = []): void {
    files.map(async (file: string) => {
      const repository = await import(file);
      _.map(repository, (item: any) => {
        if (_.isFunction(item)) {
          container.registerSingleton<`I${item.name}`>(`${item.name}`, item);
        }
        return true;
      });
      return true;
    });
  }
}

export { AutoLoadRepositories };
