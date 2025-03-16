import { prisma } from '../../../infra/database/prisma.service';
import {
  ConflictException,
  NotFoundException,
} from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userCompanyValidator } from '../../../shared/validators/user-company.validator';
import { CompanyUpdateDto } from '../domain/dto/company-update.dto';
import { CompanyEntity } from '../domain/entities/company.entity';

class CompanyUpdateService {
  async execute(
    id: number,
    dto: CompanyUpdateDto,
    userRequest: UserRequest,
  ): Promise<CompanyEntity> {
    const company = await prisma.company.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!company) throw new NotFoundException('Empresa não encontrada!');

    const existingCompany = await prisma.company.findFirst({
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

    if (existingCompany) throw new ConflictException('Empresa já cadastrada!');

    await userCompanyValidator(id, userRequest);

    const updatedCompany = await prisma.company.update({
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
      include: {
        organization: true,
        address: true,
      },
    });

    return new CompanyEntity(updatedCompany);
  }
}

export const companyUpdateService = new CompanyUpdateService();
