import { $Enums } from '@prisma/client';
import { Router } from 'express';
import { UserCreateSchema } from '../../modules/user/domain/schemas/user-create.schema';
import { UserDeleteSchema } from '../../modules/user/domain/schemas/user-delete.schema';
import { UserFindManySchema } from '../../modules/user/domain/schemas/user-find-many.schema';
import { UserFindOneSchema } from '../../modules/user/domain/schemas/user-find-one.schema';
import { UserUpdateSchema } from '../../modules/user/domain/schemas/user-update.schema';
import { userAbilitiesMiddleware } from '../../shared/middlewares/user-abilities.middleware';
import { zodValidateMiddleware } from '../../shared/middlewares/zod-validate.middleware';
import { userController } from '../../modules/user/controllers/user.controller';
import { UserUpdateSelfSchema } from '../../modules/user/domain/schemas/user-update-self.schema';
import { UserUpdateAvatarSchema } from '../../modules/user/domain/schemas/user-update-avatar.schema';
import { upload } from '../config/multer.config';
import { UserDeleteAvatarSchema } from '../../modules/user/domain/schemas/user-delete-avatar.schema';
import { UserUpdateStatusSchema } from '../../modules/user/domain/schemas/user-update-status.schema';

export const userRouter: Router = Router();

userRouter.post(
  '/users',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.USERS,
    $Enums.AbilityActions.CREATE,
  ),
  zodValidateMiddleware(UserCreateSchema),
  userController.create,
);

userRouter.get(
  '/users',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.USERS,
    $Enums.AbilityActions.READ,
  ),
  zodValidateMiddleware(UserFindManySchema),
  userController.findAll,
);

userRouter.get(
  '/users/self',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.USERS,
    $Enums.AbilityActions.READ,
  ),
  userController.findSelf,
);

userRouter.put(
  '/users/self',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.USERS,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(UserUpdateSelfSchema),
  userController.updateSelf,
);

userRouter.post(
  '/users/:id/avatar',
  upload.single('file'),
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.USERS,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(UserUpdateAvatarSchema),
  userController.updateAvatar,
);

userRouter.delete(
  '/users/:id/avatar',
  upload.single('file'),
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.USERS,
    $Enums.AbilityActions.DELETE,
  ),
  zodValidateMiddleware(UserDeleteAvatarSchema),
  userController.updateAvatar,
);

userRouter.get(
  '/users/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.USERS,
    $Enums.AbilityActions.READ,
  ),
  zodValidateMiddleware(UserFindOneSchema),
  userController.findOne,
);
userRouter.put(
  '/users/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.USERS,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(UserUpdateSchema),
  userController.update,
);

userRouter.delete(
  '/users/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.USERS,
    $Enums.AbilityActions.DELETE,
  ),
  zodValidateMiddleware(UserDeleteSchema),
  userController.delete,
);

userRouter.patch(
  '/users/:id/status',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.USERS,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(UserUpdateStatusSchema),
  userController.updateStatus,
);
