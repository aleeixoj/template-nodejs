import Router, { Request, Response, NextFunction } from 'express';

import { CreateUserController } from '../useCases/Create/Create.ctrl';
import { DeleteUserController } from '../useCases/Delete/Delete.ctrl';
import { FindAllUsersController } from '../useCases/FindAll/FindAll.ctrl';
import { FindUserByIdController } from '../useCases/FindById/FindById.ctrl';
import { UpdateUserController } from '../useCases/Update/Update.ctrl';

const router = Router();

const createController = new CreateUserController();
const findByIdController = new FindUserByIdController();
const deleteController = new DeleteUserController();
const findAllController = new FindAllUsersController();
const updateController = new UpdateUserController();
const defaultArgs: any = {
  modelName: 'user',
  plural: '',
  singular: '',
};

router.post('/', (request: Request, response: Response, next: NextFunction) =>
  createController.handle(request, response, next, defaultArgs)
);

router.get(
  '/:uuid',
  (request: Request, response: Response, next: NextFunction) =>
    findByIdController.handle(request, response, next, defaultArgs)
);
router.delete(
  '/:uuid',
  (request: Request, response: Response, next: NextFunction) =>
    deleteController.handle(request, response, next)
);

router.get('/', (request: Request, response: Response, next: NextFunction) =>
  findAllController.handle(request, response, next, defaultArgs)
);

router.patch(
  '/:uuid',
  (request: Request, response: Response, next: NextFunction) =>
    updateController.handle(request, response, next, defaultArgs)
);

const exportRoutes = Router();
exportRoutes.use('/users', router);

export { exportRoutes };
