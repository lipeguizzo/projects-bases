import { RoleEntity } from '../domain/entities/role.entity';
import { RoleFindManyDto } from './../domain/dto/role-find-many.dto';
import { roleReferencePermission } from '../helpers/role-reference-permission.helper';
import { UserRequest } from '../../../shared/types/user-request';
import { PaginationResponseDto } from '../../../shared/domain/dto/pagination-response.dto';
import { generatePaginationMeta } from '../../../shared/utils/generate-pagination-metadata';
import { Prisma, Role, $Enums } from '@prisma/client';
import { prisma } from '../../../infra/database/prisma.service';
import { convertStringToArray } from '../../../shared/utils/string';

class RoleFindManyService {
  async execute(
    dto: RoleFindManyDto,
    userRequest: UserRequest,
  ): Promise<PaginationResponseDto<RoleEntity>> {
    const [roles, totalRoles] = await this.findRoles(dto, userRequest);

    return {
      data: roles.map((role) => new RoleEntity(role)),
      _meta: generatePaginationMeta(
        '/roles',
        totalRoles,
        Number(dto.page),
        Number(dto.pageSize),
        {
          ...dto,
          isDefault: String(dto.isDefault),
          status: String(dto.status),
          includeDeleted: String(dto.includeDeleted),
        },
      ),
    };
  }

  private async findRoles(
    params: RoleFindManyDto,
    userRequest: UserRequest,
  ): Promise<[Role[], number]> {
    const dynamicWhere = this.generateDynamicWhere(params, userRequest);

    const orderBy = this.formatOrderByColumn(params);

    return prisma.$transaction([
      prisma.role.findMany({
        where: dynamicWhere,
        orderBy: orderBy,
        include: {
          organization: true,
          company: true,
        },

        skip: (Number(params.page) - 1) * Number(params.pageSize),
        take: params.pageSize,
      }),

      prisma.role.count({ where: dynamicWhere }),
    ]);
  }

  private generateDynamicWhere(
    dto: RoleFindManyDto,
    userRequest: UserRequest,
  ): Prisma.RoleWhereInput {
    const dynamicWhere: Prisma.RoleWhereInput = {
      OR: [
        {
          organizationId: userRequest?.organizationId ?? undefined,
          companyId: userRequest?.companyId ?? undefined,
          isDefault: false,
        },
        {
          isDefault: true,
        },
      ],
    };

    const rolePermissions = roleReferencePermission(userRequest);

    if (rolePermissions.length > 0) {
      dynamicWhere.AND = {
        OR: rolePermissions,
      };
    }

    if (dto.search)
      dynamicWhere.OR?.map(
        (element) => (element.AND = { name: { contains: dto.search } }),
      );

    if (dto.name) {
      dynamicWhere.name = { contains: dto.name };
    }

    if (dto.isDefault) {
      dynamicWhere.isDefault = String(dto.isDefault) === 'true' ? true : false;
    }

    if (dto.reference) {
      dynamicWhere.reference = dto.reference;
    }

    if (dto.status?.length) {
      dynamicWhere.status = {
        in: convertStringToArray<$Enums.Status>(String(dto.status)),
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
    params: RoleFindManyDto,
  ): Prisma.RoleOrderByWithRelationInput {
    if (!params.orderBy) return { id: params.ordering };
    return { [params.orderBy]: params.ordering };
  }
}

export const roleFindManyService = new RoleFindManyService();
