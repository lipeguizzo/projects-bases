import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userOrganizationValidator } from '../../../shared/validators/user-organization.validator';
import { OrganizationUpdateStatusDto } from '../domain/dto/organization-update-status.dto';
import { OrganizationEntity } from '../domain/entities/organization.entity';

class OrganizationUpdateStatusService {
  async execute(
    id: number,
    dto: OrganizationUpdateStatusDto,
    userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    const organization = await prisma.organization.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!organization)
      throw new NotFoundException('Organização não encontrada!');

    await userOrganizationValidator(id, userRequest);

    const updatedOrganization = await prisma.organization.update({
      data: {
        status: dto.status,
      },
      where: {
        id: id,
      },
    });

    return new OrganizationEntity(updatedOrganization);
  }
}

export const organizationUpdateStatusService =
  new OrganizationUpdateStatusService();
