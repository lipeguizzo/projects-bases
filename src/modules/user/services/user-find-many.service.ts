import { Prisma, User, $Enums } from '@prisma/client';
import { UserFindManyDto } from '../domain/dto/user-find-many.dto';
import { UserEntity } from '../domain/entities/user.entity';
import { UserRequest } from '../../../shared/types/user-request';
import { PaginationResponseDto } from '../../../shared/domain/dto/pagination-response.dto';
import { generatePaginationMeta } from '../../../shared/utils/generate-pagination-metadata';
import { prisma } from '../../../infra/database/prisma.service';
import { convertStringToArray } from '../../../shared/utils/string';

class UserFindManyService {
  async execute(
    dto: UserFindManyDto,
    userRequest: UserRequest,
  ): Promise<PaginationResponseDto<UserEntity>> {
    const [users, totalUsers] = await this.findUsers(dto, userRequest);

    return {
      data: users.map((user) => new UserEntity(user)),
      _meta: generatePaginationMeta(
        '/users',
        totalUsers,
        Number(dto.page),
        Number(dto.pageSize),
        {
          ...dto,
          includeDeleted: String(dto.includeDeleted),
        },
      ),
    };
  }

  private async findUsers(
    params: UserFindManyDto,
    userRequest: UserRequest,
  ): Promise<[User[], number]> {
    const dynamicWhere = this.generateDynamicWhere(params, userRequest);

    const orderBy = this.formatOrderByColumn(params);

    return prisma.$transaction([
      prisma.user.findMany({
        where: dynamicWhere,
        orderBy: orderBy,
        include: {
          role: true,
          organization: true,
          company: true,
          avatar: true,
        },

        skip: (Number(params.page) - 1) * Number(params.pageSize),
        take: params.pageSize,
      }),

      prisma.user.count({ where: dynamicWhere }),
    ]);
  }

  private generateDynamicWhere(
    dto: UserFindManyDto,
    userRequest: UserRequest,
  ): Prisma.UserWhereInput {
    const dynamicWhere: Prisma.UserWhereInput = {
      organizationId: userRequest?.organizationId ?? undefined,
      companyId: userRequest?.companyId ?? undefined,
    };

    if (dto.search)
      dynamicWhere.OR = [
        { name: { contains: dto.search } },
        { email: { contains: dto.search } },
      ];

    if (dto.name) {
      dynamicWhere.name = { contains: dto.name };
    }

    if (dto.email) {
      dynamicWhere.email = { contains: dto.email };
    }

    if (dto.gender) {
      dynamicWhere.gender = dto.gender;
    }

    if (dto.roleId) {
      dynamicWhere.roleId = dto.roleId;
    }

    if (dto.roleReference) {
      dynamicWhere.role = { reference: dto.roleReference };
    }

    if (dto.organizationId) {
      dynamicWhere.organizationId = dto.organizationId;
    }

    if (dto.companyId) {
      dynamicWhere.companyId = dto.companyId;
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
    params: UserFindManyDto,
  ): Prisma.UserOrderByWithRelationInput {
    if (!params.orderBy) return { id: params.ordering };
    return { [params.orderBy]: params.ordering };
  }
}

export const userFindManyService = new UserFindManyService();
