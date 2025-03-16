import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserRequest } from 'src/shared/types/user-request';
import { userOrganizationValidator } from 'src/shared/validators/user-organization.validator';
import { OrganizationEntity } from '../domain/entities/organization.entity';

@Injectable()
export class OrganizationFindOneService {
  constructor(private prisma: PrismaService) {}
  async execute(
    id: number,
    userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    const organization = await this.prisma.organization.findFirst({
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
