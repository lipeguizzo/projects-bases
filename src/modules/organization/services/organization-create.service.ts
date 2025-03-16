import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { OrganizationCreateDto } from '../domain/dto/organization-create.dto';
import { OrganizationEntity } from '../domain/entities/organization.entity';

@Injectable()
export class OrganizationCreateService {
  constructor(private prisma: PrismaService) {}
  async execute(dto: OrganizationCreateDto): Promise<OrganizationEntity> {
    const organization = await this.prisma.organization.findFirst({
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
    const createdOrganization = await this.prisma.organization.create({
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
