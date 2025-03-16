import { $Enums } from '@prisma/client';
import { Router } from 'express';
import { userAbilitiesMiddleware } from '../../shared/middlewares/user-abilities.middleware';
import { zodValidateMiddleware } from '../../shared/middlewares/zod-validate.middleware';
import { organizationController } from '../../modules/organization/controllers/organization.controller';
import { OrganizationCreateSchema } from '../../modules/organization/domain/schemas/organization-create.schema';
import { OrganizationFindManySchema } from '../../modules/organization/domain/schemas/organization-find-many.schema';
import { OrganizationFindOneSchema } from '../../modules/organization/domain/schemas/organization-find-one.schema';
import { OrganizationUpdateSchema } from '../../modules/organization/domain/schemas/organization-update.schema';
import { OrganizationDeleteSchema } from '../../modules/organization/domain/schemas/organization-delete.schema';
import { upload } from '../config/multer.config';
import { OrganizationUpdateAvatarSchema } from '../../modules/organization/domain/schemas/organization-update-avatar.schema';
import { OrganizationDeleteAvatarSchema } from '../../modules/organization/domain/schemas/organization-delete-avatar.schema';
import { OrganizationUpdateStatusSchema } from '../../modules/organization/domain/schemas/organization-update-status.schema';

export const organizationRouter: Router = Router();

organizationRouter.post(
  '/organizations',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.CREATE,
  ),
  zodValidateMiddleware(OrganizationCreateSchema),
  organizationController.create,
);
organizationRouter.get(
  '/organizations',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.READ,
  ),
  zodValidateMiddleware(OrganizationFindManySchema),
  organizationController.findAll,
);

organizationRouter.get(
  '/organizations/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.READ,
  ),
  zodValidateMiddleware(OrganizationFindOneSchema),
  organizationController.findOne,
);

organizationRouter.post(
  '/organizations/:id/avatar',
  upload.single('file'),
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(OrganizationUpdateAvatarSchema),
  organizationController.updateAvatar,
);

organizationRouter.delete(
  '/organizations/:id/avatar',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.DELETE,
  ),
  zodValidateMiddleware(OrganizationDeleteAvatarSchema),
  organizationController.deleteAvatar,
);

organizationRouter.put(
  '/organizations/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(OrganizationUpdateSchema),
  organizationController.update,
);

organizationRouter.delete(
  '/organizations/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.DELETE,
  ),
  zodValidateMiddleware(OrganizationDeleteSchema),
  organizationController.delete,
);

organizationRouter.patch(
  '/organizations/:id/status',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(OrganizationUpdateStatusSchema),
  organizationController.updateStatus,
);
