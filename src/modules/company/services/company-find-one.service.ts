import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userCompanyValidator } from '../../../shared/validators/user-company.validator';
import { CompanyEntity } from '../domain/entities/company.entity';

class CompanyFindOneService {
  async execute(id: number, userRequest: UserRequest): Promise<CompanyEntity> {
    const company = await prisma.company.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        address: true,
        avatar: true,
      },
    });

    if (!company) throw new NotFoundException('Empresa não encontrada!');

    await userCompanyValidator(id, userRequest);

    return new CompanyEntity(company);
  }
}

export const companyFindOneService = new CompanyFindOneService();
