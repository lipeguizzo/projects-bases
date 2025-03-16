import { prisma } from '../../../infra/database/prisma.service';
import { ConflictException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userOrganizationValidator } from '../../../shared/validators/user-organization.validator';
import { CompanyCreateDto } from '../domain/dto/company-create.dto';
import { CompanyEntity } from '../domain/entities/company.entity';

class CompanyCreateService {
  async execute(
    dto: CompanyCreateDto,
    userRequest: UserRequest,
  ): Promise<CompanyEntity> {
    const company = await prisma.company.findFirst({
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

    const createdCompany = await prisma.company.create({
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

export const companyCreateService = new CompanyCreateService();
