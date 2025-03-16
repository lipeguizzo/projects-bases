import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userCompanyValidator } from '../../../shared/validators/user-company.validator';
import { CompanyEntity } from '../domain/entities/company.entity';
import { companyDeleteValidator } from '../validators/company-delete.validator';
import { companyDeleteAvatarService } from './company-delete-avatar.service';

class CompanyDeleteService {
  async execute(id: number, userRequest: UserRequest): Promise<CompanyEntity> {
    const company = await prisma.company.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        avatar: true,
      },
    });

    if (!company) throw new NotFoundException('Empresa não encontrada!');

    await userCompanyValidator(id, userRequest);

    await companyDeleteValidator(id);

    if (company.avatar)
      await companyDeleteAvatarService.execute(id, userRequest);

    const updatedCompany = await prisma.company.update({
      data: {
        deletedAt: new Date(),
        address: {
          update: {
            deletedAt: new Date(),
          },
        },
      },
      where: {
        id: id,
      },
    });

    return new CompanyEntity(updatedCompany);
  }
}

export const companyDeleteService = new CompanyDeleteService();
