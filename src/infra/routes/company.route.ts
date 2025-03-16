import { $Enums } from '@prisma/client';
import { Router } from 'express';
import { CompanyCreateSchema } from '../../modules/company/domain/schemas/company-create.schema';
import { CompanyDeleteAvatarSchema } from '../../modules/company/domain/schemas/company-delete-avatar.schema';
import { CompanyDeleteSchema } from '../../modules/company/domain/schemas/company-delete.schema';
import { CompanyFindManySchema } from '../../modules/company/domain/schemas/company-find-many.schema';
import { CompanyFindOneSchema } from '../../modules/company/domain/schemas/company-find-one.schema';
import { CompanyUpdateAvatarSchema } from '../../modules/company/domain/schemas/company-update-avatar.schema';
import { CompanyUpdateSchema } from '../../modules/company/domain/schemas/company-update.schema';
import { userAbilitiesMiddleware } from '../../shared/middlewares/user-abilities.middleware';
import { zodValidateMiddleware } from '../../shared/middlewares/zod-validate.middleware';
import { upload } from '../config/multer.config';
import { companyController } from '../../modules/company/controllers/company.controller';
import { CompanyUpdateStatusSchema } from '../../modules/company/domain/schemas/company-update-status.schema';

export const companyRouter: Router = Router();

companyRouter.post(
  '/companies',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.COMPANIES,
    $Enums.AbilityActions.CREATE,
  ),
  zodValidateMiddleware(CompanyCreateSchema),
  companyController.create,
);
companyRouter.get(
  '/companies',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.COMPANIES,
    $Enums.AbilityActions.READ,
  ),
  zodValidateMiddleware(CompanyFindManySchema),
  companyController.findAll,
);

companyRouter.get(
  '/companies/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.COMPANIES,
    $Enums.AbilityActions.READ,
  ),
  zodValidateMiddleware(CompanyFindOneSchema),
  companyController.findOne,
);

companyRouter.post(
  '/companies/:id/avatar',
  upload.single('file'),
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.COMPANIES,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(CompanyUpdateAvatarSchema),
  companyController.updateAvatar,
);

companyRouter.delete(
  '/companies/:id/avatar',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.COMPANIES,
    $Enums.AbilityActions.DELETE,
  ),
  zodValidateMiddleware(CompanyDeleteAvatarSchema),
  companyController.deleteAvatar,
);

companyRouter.put(
  '/companies/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.COMPANIES,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(CompanyUpdateSchema),
  companyController.update,
);

companyRouter.delete(
  '/companies/:id',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.COMPANIES,
    $Enums.AbilityActions.DELETE,
  ),
  zodValidateMiddleware(CompanyDeleteSchema),
  companyController.delete,
);

companyRouter.patch(
  '/companies/:id/status',
  userAbilitiesMiddleware(
    $Enums.AbilityCodes.COMPANIES,
    $Enums.AbilityActions.UPDATE,
  ),
  zodValidateMiddleware(CompanyUpdateStatusSchema),
  companyController.updateStatus,
);
