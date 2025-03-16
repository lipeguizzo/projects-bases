import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyFindManyService } from './services/company-find-many.service';
import { CompanyFindOneService } from './services/company-find-one.service';
import { CompanyCreateService } from './services/company-create.service';
import { CompanyUpdateService } from './services/company-update.service';
import { CompanyUpdateStatusService } from './services/company-update-status.service';
import { CompanyDeleteService } from './services/company-delete.service';
import { CompanyUpdateAvatarService } from './services/company-update-avatar.service';
import { CompanyDeleteAvatarService } from './services/company-delete-avatar.service';

@Module({
  controllers: [CompanyController],
  providers: [
    CompanyFindManyService,
    CompanyFindOneService,
    CompanyCreateService,
    CompanyUpdateService,
    CompanyUpdateStatusService,
    CompanyUpdateAvatarService,
    CompanyDeleteAvatarService,
    CompanyDeleteService,
  ],
})
export class CompanyModule {}
