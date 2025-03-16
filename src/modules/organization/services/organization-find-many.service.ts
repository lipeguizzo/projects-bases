import { Organization, Prisma, $Enums } from '@prisma/client';
import { OrganizationFindManyDto } from '../domain/dto/organization-find-many.dto';
import { OrganizationEntity } from '../domain/entities/organization.entity';
import { UserRequest } from '../../../shared/types/user-request';
import { PaginationResponseDto } from '../../../shared/domain/dto/pagination-response.dto';
import { generatePaginationMeta } from '../../../shared/utils/generate-pagination-metadata';
import { prisma } from '../../../infra/database/prisma.service';
import { convertStringToArray } from '../../../shared/utils/string';

class OrganizationFindManyService {
  async execute(
    dto: OrganizationFindManyDto,
    userRequest: UserRequest,
  ): Promise<PaginationResponseDto<OrganizationEntity>> {
    const [organizations, totalOrganizations] = await this.findOrganizations(
      dto,
      userRequest,
    );

    return {
      data: organizations.map(
        (organization) => new OrganizationEntity(organization),
      ),
      _meta: generatePaginationMeta(
        '/organizations',
        totalOrganizations,
        Number(dto.page),
        Number(dto.pageSize),
        {
          ...dto,
          includeDeleted: String(dto.includeDeleted),
        },
      ),
    };
  }

  private async findOrganizations(
    params: OrganizationFindManyDto,
    userRequest: UserRequest,
  ): Promise<[Organization[], number]> {
    const dynamicWhere = this.generateDynamicWhere(params, userRequest);

    const orderBy = this.formatOrderByColumn(params);

    return prisma.$transaction([
      prisma.organization.findMany({
        where: dynamicWhere,
        orderBy: orderBy,
        include: {
          address: true,
          avatar: true,
        },

        skip: (Number(params.page) - 1) * Number(params.pageSize),
        take: params.pageSize,
      }),

      prisma.organization.count({ where: dynamicWhere }),
    ]);
  }

  private generateDynamicWhere(
    dto: OrganizationFindManyDto,
    userRequest: UserRequest,
  ): Prisma.OrganizationWhereInput {
    const dynamicWhere: Prisma.OrganizationWhereInput = {
      id: userRequest?.organizationId ?? undefined,
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
    params: OrganizationFindManyDto,
  ): Prisma.OrganizationOrderByWithRelationInput {
    if (!params.orderBy) return { id: params.ordering };
    return { [params.orderBy]: params.ordering };
  }
}

export const organizationFindManyService = new OrganizationFindManyService();
