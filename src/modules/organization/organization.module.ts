import { Module } from '@nestjs/common';
import { OrganizationFindManyService } from './services/organization-find-many.service';
import { OrganizationFindOneService } from './services/organization-find-one.service';
import { OrganizationCreateService } from './services/organization-create.service';
import { OrganizationUpdateService } from './services/organization-update.service';
import { OrganizationUpdateStatusService } from './services/organization-update-status.service';
import { OrganizationDeleteService } from './services/organization-delete.service';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationUpdateAvatarService } from './services/organization-update-avatar.service';
import { OrganizationDeleteAvatarService } from './services/organization-delete-avatar.service';

@Module({
  controllers: [OrganizationController],
  providers: [
    OrganizationFindManyService,
    OrganizationFindOneService,
    OrganizationCreateService,
    OrganizationUpdateService,
    OrganizationUpdateStatusService,
    OrganizationDeleteService,
    OrganizationUpdateAvatarService,
    OrganizationDeleteAvatarService,
  ],
})
export class OrganizationModule {}
