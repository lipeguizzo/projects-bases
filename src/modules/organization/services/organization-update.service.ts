import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserRequest } from 'src/shared/types/user-request';
import { userOrganizationValidator } from 'src/shared/validators/user-organization.validator';
import { OrganizationUpdateDto } from '../domain/dto/organization-update.dto';
import { OrganizationEntity } from '../domain/entities/organization.entity';

@Injectable()
export class OrganizationUpdateService {
  constructor(private prisma: PrismaService) {}
  async execute(
    id: number,
    dto: OrganizationUpdateDto,
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

    const existingOrganization = await this.prisma.organization.findFirst({
      where: {
        NOT: {
          id: id,
        },
        OR: [
          {
            name: dto.name,
          },
          {
            email: dto.email,
          },
        ],
        deletedAt: null,
      },
    });

    if (existingOrganization)
      throw new ConflictException('Organização já cadastrada!');

    await userOrganizationValidator(id, userRequest);

    const updatedOrganization = await this.prisma.organization.update({
      data: {
        name: dto.name,
        tradeName: dto.tradeName,
        email: dto.email,
        status: dto.status,
        address: {
          update: dto.address,
        },
      },
      where: {
        id: id,
      },
    });

    return new OrganizationEntity(updatedOrganization);
  }
}
