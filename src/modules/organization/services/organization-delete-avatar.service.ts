import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { StoredFileDeleteService } from 'src/modules/stored-file/services/stored-file-delete.service';
import { UserRequest } from 'src/shared/types/user-request';
import { userOrganizationValidator } from 'src/shared/validators/user-organization.validator';
import { OrganizationEntity } from '../domain/entities/organization.entity';

@Injectable()
export class OrganizationDeleteAvatarService {
  constructor(
    private prisma: PrismaService,
    private storedFileDeleteService: StoredFileDeleteService,
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

    const updatedOrganization = await this.prisma.organization.update({
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

    await this.storedFileDeleteService.execute(organization.avatar.uuid);

    return new OrganizationEntity(updatedOrganization);
  }
}
