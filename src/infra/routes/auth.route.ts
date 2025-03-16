import { Router } from 'express';
import { authController } from '../../modules/auth/controllers/auth.controller';
import { AuthLoginSchema } from '../../modules/auth/domain/schemas/auth-login.schema';
import { AuthRecoverPasswordSchema } from '../../modules/auth/domain/schemas/auth-recover-password.schema';
import { AuthRefreshSchema } from '../../modules/auth/domain/schemas/auth-refresh.schema';
import { AuthRegisterSchema } from '../../modules/auth/domain/schemas/auth-register.schema';
import { AuthResetPasswordSchema } from '../../modules/auth/domain/schemas/auth-reset-recover.schema';
import { zodValidateMiddleware } from '../../shared/middlewares/zod-validate.middleware';

export const authRouter: Router = Router();

authRouter.post(
  '/auth/login',
  zodValidateMiddleware(AuthLoginSchema),
  authController.login,
);

authRouter.post(
  '/auth/refresh',
  zodValidateMiddleware(AuthRefreshSchema),
  authController.refresh,
);

authRouter.post(
  '/auth/register',
  zodValidateMiddleware(AuthRegisterSchema),
  authController.register,
);

authRouter.post(
  '/auth/recover-password',
  zodValidateMiddleware(AuthRecoverPasswordSchema),
  authController.recoverPassword,
);

authRouter.patch(
  '/auth/reset-password',
  zodValidateMiddleware(AuthResetPasswordSchema),
  authController.resetPassword,
);
