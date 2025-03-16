import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserRequest } from 'src/shared/types/user-request';
import { userOrganizationValidator } from 'src/shared/validators/user-organization.validator';
import { OrganizationEntity } from '../domain/entities/organization.entity';
import { organizationDeleteValidator } from '../validators/organization-delete.validator';
import { OrganizationDeleteAvatarService } from './organization-delete-avatar.service';

@Injectable()
export class OrganizationDeleteService {
  constructor(
    private prisma: PrismaService,
    private organizationDeleteAvatarService: OrganizationDeleteAvatarService,
  ) {}
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
        avatar: true,
      },
    });

    if (!organization)
      throw new NotFoundException('Organização não encontrada!');

    await userOrganizationValidator(id, userRequest);

    await organizationDeleteValidator(id);

    if (organization.avatar)
      await this.organizationDeleteAvatarService.execute(id, userRequest);

    const updatedOrganization = await this.prisma.organization.update({
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
