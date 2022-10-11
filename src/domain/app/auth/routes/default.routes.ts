import { Router } from 'express';

import { AuthenticateUserController } from '../useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '../useCases/refreshToken/RefreshTokenController';

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post('/sessions', authenticateUserController.handle);
authRoutes.post('/refresh-token', refreshTokenController.handle);
// const exportRoutes = Router();
// exportRoutes.use('/auth', authRoutes);

export { authRoutes };
