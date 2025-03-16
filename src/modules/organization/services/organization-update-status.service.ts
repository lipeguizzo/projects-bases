import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserRequest } from 'src/shared/types/user-request';
import { userOrganizationValidator } from 'src/shared/validators/user-organization.validator';
import { OrganizationUpdateStatusDto } from '../domain/dto/organization-update-status.dto';
import { OrganizationEntity } from '../domain/entities/organization.entity';

@Injectable()
export class OrganizationUpdateStatusService {
  constructor(private prisma: PrismaService) {}
  async execute(
    id: number,
    dto: OrganizationUpdateStatusDto,
    userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    const organization = await this.prisma.organization.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!organization)
      throw new NotFoundException('Organização não encontrada!');

    await userOrganizationValidator(id, userRequest);

    const updatedOrganization = await this.prisma.organization.update({
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
