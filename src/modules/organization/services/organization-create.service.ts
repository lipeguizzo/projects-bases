import { prisma } from '../../../infra/database/prisma.service';
import { ConflictException } from '../../../shared/exceptions';
import { OrganizationCreateDto } from '../domain/dto/organization-create.dto';
import { OrganizationEntity } from '../domain/entities/organization.entity';

class OrganizationCreateService {
  async execute(dto: OrganizationCreateDto): Promise<OrganizationEntity> {
    const organization = await prisma.organization.findFirst({
      where: {
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

    if (organization) throw new ConflictException('Organização já cadastrada!');
    const createdOrganization = await prisma.organization.create({
      data: {
        name: dto.name,
        tradeName: dto.tradeName,
        email: dto.email,
        status: dto.status,
        address: {
          create: dto.address,
        },
      },
      include: {
        address: true,
      },
    });

    return new OrganizationEntity(createdOrganization);
  }
}

export const organizationCreateService = new OrganizationCreateService();
