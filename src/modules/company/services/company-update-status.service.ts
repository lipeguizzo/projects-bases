import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userCompanyValidator } from '../../../shared/validators/user-company.validator';
import { CompanyUpdateStatusDto } from '../domain/dto/company-update-status.dto';
import { CompanyEntity } from '../domain/entities/company.entity';

class CompanyUpdateStatusService {
  async execute(
    id: number,
    dto: CompanyUpdateStatusDto,
    userRequest: UserRequest,
  ): Promise<CompanyEntity> {
    const company = await prisma.company.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!company) throw new NotFoundException('Empresa não encontrada!');

    await userCompanyValidator(id, userRequest);

    const updatedCompany = await prisma.company.update({
      data: {
        status: dto.status,
      },
      where: {
        id: id,
      },
    });

    return new CompanyEntity(updatedCompany);
  }
}

export const companyUpdateStatusService = new CompanyUpdateStatusService();
