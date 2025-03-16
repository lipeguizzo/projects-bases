import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CompanyEntity } from '../domain/entities/company.entity';
import { UserRequest } from 'src/shared/types/user-request';
import { userCompanyValidator } from 'src/shared/validators/user-company.validator';
import { companyDeleteValidator } from '../validators/company-delete.validator';
import { CompanyDeleteAvatarService } from './company-delete-avatar.service';

@Injectable()
export class CompanyDeleteService {
  constructor(
    private prisma: PrismaService,
    private companyDeleteAvatarService: CompanyDeleteAvatarService,
  ) {}
  async execute(id: number, userRequest: UserRequest): Promise<CompanyEntity> {
    const company = await this.prisma.company.findFirst({
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
      await this.companyDeleteAvatarService.execute(id, userRequest);

    const updatedCompany = await this.prisma.company.update({
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
