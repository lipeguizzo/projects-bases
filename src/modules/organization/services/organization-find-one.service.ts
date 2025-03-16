import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userOrganizationValidator } from '../../../shared/validators/user-organization.validator';
import { OrganizationEntity } from '../domain/entities/organization.entity';

class OrganizationFindOneService {
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
        address: true,
        avatar: true,
      },
    });

    if (!organization)
      throw new NotFoundException('Organização não encontrada!');

    await userOrganizationValidator(id, userRequest);

    return new OrganizationEntity(organization);
  }
}

export const organizationFindOneService = new OrganizationFindOneService();
