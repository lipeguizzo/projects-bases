import { $Enums } from '@prisma/client';
import { Router } from 'express';
import { roleController } from '../../modules/role/controllers/role.controller';
import { RoleCreateSchema } from '../../modules/role/domain/schemas/role-create.schema';
import { RoleDeleteSchema } from '../../modules/role/domain/schemas/role-delete.schema';
import { RoleFindAbilitiesSchema } from '../../modules/role/domain/schemas/role-find-abilities.schema';
import { RoleFindManySchema } from '../../modules/role/domain/schemas/role-find-many.schema';
import { RoleFindOneSchema } from '../../modules/role/domain/schemas/role-find-one.schema';
import { RoleUpdateSchema } from '../../modules/role/domain/schemas/role-update.schema';
import { zodValidateMiddleware } from '../../shared/middlewares/zod-validate.middleware';
import { userAbilitiesMiddleware } from '../../shared/middlewares/user-abilities.middleware';

export const roleRouter: Router = Router();

roleRouter.post(
  '/roles',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ROLES,
    $Enums.AbilityActions.CREATE,
  ),
  zodValidateMiddleware(RoleCreateSchema),
  roleController.create,
);
roleRouter.get(
  '/roles',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ROLES,
    $Enums.AbilityActions.READ,
  ),
  zodValidateMiddleware(RoleFindManySchema),
  roleController.findAll,
);

roleRouter.get(
  '/roles/all-abilities',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ROLES,
    $Enums.AbilityActions.READ,
  ),
  roleController.findAllAbilities,
);

roleRouter.get(
  '/roles/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ROLES,
    $Enums.AbilityActions.READ,
  ),
  zodValidateMiddleware(RoleFindOneSchema),
  roleController.findOne,
);

roleRouter.put(
  '/roles/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ROLES,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(RoleUpdateSchema),
  roleController.update,
);

roleRouter.delete(
  '/roles/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ROLES,
    $Enums.AbilityActions.DELETE,
  ),
  zodValidateMiddleware(RoleDeleteSchema),
  roleController.delete,
);

roleRouter.patch(
  '/roles/:id/status',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ROLES,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(RoleUpdateSchema),
  roleController.updateStatus,
);

roleRouter.get(
  '/roles/:id/abilities',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ROLES,
    $Enums.AbilityActions.READ,
  ),
  zodValidateMiddleware(RoleFindAbilitiesSchema),
  roleController.findAbilities,
);
