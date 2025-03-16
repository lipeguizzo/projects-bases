import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userCompanyValidator } from '../../../shared/validators/user-company.validator';
import { storedFileDeleteService } from '../../stored-file/services/stored-file-delete.service';
import { CompanyEntity } from '../domain/entities/company.entity';

class CompanyDeleteAvatarService {
  async execute(id: number, userRequest: UserRequest): Promise<CompanyEntity> {
    await userCompanyValidator(id, userRequest);

    const company = await prisma.company.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        avatar: true,
      },
    });

    if (!company) throw new NotFoundException('Arquivo não encontrado!');

    const updatedCompany = await prisma.company.update({
      data: {
        avatarId: null,
      },
      where: {
        id: company.id,
      },
      include: {
        avatar: true,
      },
    });

    if (company.avatar)
      await storedFileDeleteService.execute(company.avatar.uuid);

    return new CompanyEntity(updatedCompany);
  }
}

export const companyDeleteAvatarService = new CompanyDeleteAvatarService();
