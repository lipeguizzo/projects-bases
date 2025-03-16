import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CompanyEntity } from '../domain/entities/company.entity';
import { userCompanyValidator } from 'src/shared/validators/user-company.validator';
import { UserRequest } from 'src/shared/types/user-request';

@Injectable()
export class CompanyFindOneService {
  constructor(private prisma: PrismaService) {}
  async execute(id: number, userRequest: UserRequest): Promise<CompanyEntity> {
    const company = await this.prisma.company.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        organization: true,
        address: true,
        avatar: true,
      },
    });

    if (!company) throw new NotFoundException('Empresa não encontrada!');

    await userCompanyValidator(id, userRequest);

    return new CompanyEntity(company);
  }
}
