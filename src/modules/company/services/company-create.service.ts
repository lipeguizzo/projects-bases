import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CompanyCreateDto } from '../domain/dto/company-create.dto';
import { CompanyEntity } from '../domain/entities/company.entity';
import { UserRequest } from 'src/shared/types/user-request';
import { userOrganizationValidator } from 'src/shared/validators/user-organization.validator';

@Injectable()
export class CompanyCreateService {
  constructor(private prisma: PrismaService) {}
  async execute(
    dto: CompanyCreateDto,
    userRequest: UserRequest,
  ): Promise<CompanyEntity> {
    const company = await this.prisma.company.findFirst({
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

    if (company) throw new ConflictException('Empresa já cadastrada!');

    await userOrganizationValidator(dto.organizationId, userRequest);

    const createdCompany = await this.prisma.company.create({
      data: {
        name: dto.name,
        tradeName: dto.tradeName,
        email: dto.email,
        status: dto.status,
        organization: {
          connect: {
            id: dto.organizationId,
          },
        },
        address: {
          create: dto.address,
        },
      },
      include: {
        organization: true,
        address: true,
      },
    });

    return new CompanyEntity(createdCompany);
  }
}
