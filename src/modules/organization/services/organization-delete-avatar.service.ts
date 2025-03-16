import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userOrganizationValidator } from '../../../shared/validators/user-organization.validator';
import { storedFileDeleteService } from '../../stored-file/services/stored-file-delete.service';
import { OrganizationEntity } from '../domain/entities/organization.entity';

class OrganizationDeleteAvatarService {
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

    const updatedOrganization = await prisma.organization.update({
      data: {
        avatarId: null,
      },
      where: {
        id: organization.id,
      },
      include: {
        avatar: true,
      },
    });

    if (organization.avatar)
      await storedFileDeleteService.execute(organization.avatar.uuid);

    return new OrganizationEntity(updatedOrganization);
  }
}

export const organizationDeleteAvatarService =
  new OrganizationDeleteAvatarService();
