import { Company, Prisma, $Enums } from '@prisma/client';
import { PaginationResponseDto } from '../../../shared/domain/dto/pagination-response.dto';
import { UserRequest } from '../../../shared/types/user-request';
import { generatePaginationMeta } from '../../../shared/utils/generate-pagination-metadata';
import { CompanyFindManyDto } from '../domain/dto/company-find-many.dto';
import { CompanyEntity } from '../domain/entities/company.entity';
import { prisma } from '../../../infra/database/prisma.service';
import { convertStringToArray } from '../../../shared/utils/string';

class CompanyFindManyService {
  async execute(
    dto: CompanyFindManyDto,
    userRequest: UserRequest,
  ): Promise<PaginationResponseDto<CompanyEntity>> {
    const [companies, totalCompanies] = await this.findCompanies(
      dto,
      userRequest,
    );

    return {
      data: companies.map((company) => new CompanyEntity(company)),
      _meta: generatePaginationMeta(
        '/companies',
        totalCompanies,
        Number(dto.page),
        Number(dto.pageSize),
        {
          ...dto,
          includeDeleted: String(dto.includeDeleted),
        },
      ),
    };
  }

  private async findCompanies(
    params: CompanyFindManyDto,
    userRequest: UserRequest,
  ): Promise<[Company[], number]> {
    const dynamicWhere = this.generateDynamicWhere(params, userRequest);

    const orderBy = this.formatOrderByColumn(params);

    return prisma.$transaction([
      prisma.company.findMany({
        where: dynamicWhere,
        orderBy: orderBy,
        include: {
          organization: true,
          address: true,
          avatar: true,
        },

        skip: (Number(params.page) - 1) * Number(params.pageSize),
        take: params.pageSize,
      }),

      prisma.company.count({ where: dynamicWhere }),
    ]);
  }

  private generateDynamicWhere(
    dto: CompanyFindManyDto,
    userRequest: UserRequest,
  ): Prisma.CompanyWhereInput {
    const dynamicWhere: Prisma.CompanyWhereInput = {
      id: userRequest?.companyId ?? undefined,
      organizationId: userRequest?.organizationId ?? undefined,
    };

    if (dto.search)
      dynamicWhere.OR = [
        { name: { contains: dto.search } },
        { tradeName: { contains: dto.search } },
        { email: { contains: dto.search } },
      ];

    if (dto.name) {
      dynamicWhere.name = { contains: dto.name };
    }

    if (dto.tradeName) {
      dynamicWhere.tradeName = { contains: dto.tradeName };
    }

    if (dto.email) {
      dynamicWhere.email = { contains: dto.email };
    }

    if (dto.organizationId) {
      dynamicWhere.organizationId = dto.organizationId;
    }

    if (dto.status?.length) {
      dynamicWhere.status = {
        in: convertStringToArray<$Enums.Status>(String(dto.status)),
      };
    }

    if (dto.state) {
      dynamicWhere.address = {
        state: { contains: dto.state },
      };
    }

    if (dto.city) {
      dynamicWhere.address = {
        city: { contains: dto.city },
      };
    }

    if (dto.street) {
      dynamicWhere.address = {
        street: { contains: dto.street },
      };
    }

    if (dto.neighborhood) {
      dynamicWhere.address = {
        neighborhood: { contains: dto.neighborhood },
      };
    }

    if (dto.includeDeleted) {
      dynamicWhere.deletedAt =
        String(dto.includeDeleted) === 'true' ? undefined : null;
    } else {
      dynamicWhere.deletedAt = null;
    }

    return dynamicWhere;
  }

  private formatOrderByColumn(
    params: CompanyFindManyDto,
  ): Prisma.CompanyOrderByWithRelationInput {
    if (!params.orderBy) return { id: params.ordering };
    return { [params.orderBy]: params.ordering };
  }
}

export const companyFindManyService = new CompanyFindManyService();
