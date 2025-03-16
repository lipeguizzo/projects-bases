import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userOrganizationValidator } from '../../../shared/validators/user-organization.validator';
import { OrganizationEntity } from '../domain/entities/organization.entity';
import { organizationDeleteValidator } from '../validators/organization-delete.validator';
import { organizationDeleteAvatarService } from './organization-delete-avatar.service';

class OrganizationDeleteService {
  async execute(
    id: number,
    userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    const organization = await prisma.organization.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        avatar: true,
      },
    });

    if (!organization)
      throw new NotFoundException('Organização não encontrada!');

    await userOrganizationValidator(id, userRequest);

    await organizationDeleteValidator(id);

    if (organization.avatar)
      await organizationDeleteAvatarService.execute(id, userRequest);

    const updatedOrganization = await prisma.organization.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: id,
      },
    });

    return new OrganizationEntity(updatedOrganization);
  }
}

export const organizationDeleteService = new OrganizationDeleteService();
