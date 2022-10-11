import { Router } from 'express';
import _ from 'lodash';

import searchFiles from '@shared/utils/files/searchFiles.util';

import { routesConfig } from './routes.config';

class AutoLoadRoutes {
  execute(): any {
    const router = Router(routesConfig);
    const files = searchFiles.getAllFiles({}, `${__dirname}/../../domain`, [
      '.routes.ts',
    ]);

    files.map(async (file: string) => {
      const routes = await import(file);

      _.map(routes, (item: any) => {
        router.use('/', item);
        return true;
      });
      return true;
    });
    return router;
  }
}

export { AutoLoadRoutes };
