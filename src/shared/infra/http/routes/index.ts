import { Router } from 'express';

import { AutoLoadRoutes } from '@shared/routes/autoloadRoutes';

const autoloadRoutes = new AutoLoadRoutes();

const router = Router();
router.use('/', autoloadRoutes.execute());

export { router };
