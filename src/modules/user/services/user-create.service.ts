import { hash } from 'bcryptjs';
import { UserCreateDto } from '../domain/dto/user-create.dto';
import { UserEntity } from '../domain/entities/user.entity';
import { UserRequest } from '../../../shared/types/user-request';
import { prisma } from '../../../infra/database/prisma.service';
import { ConflictException } from '../../../shared/exceptions';
import { userRoleValidator } from '../../../shared/validators/user-role.validator';
import { userOrganizationValidator } from '../../../shared/validators/user-organization.validator';
import { userCompanyValidator } from '../../../shared/validators/user-company.validator';

class UserCreateService {
  async execute(
    dto: UserCreateDto,
    userRequest: UserRequest,
  ): Promise<UserEntity> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            name: dto.name,
          },
          {
            email: dto.email,
          },
        ],
        deletedAt: null,
      },
    });

    if (user) throw new ConflictException('Usuário já cadastrado!');

    if (dto.roleId) await userRoleValidator(dto?.roleId, userRequest);

    if (dto.organizationId) {
      await userOrganizationValidator(dto?.organizationId, userRequest);
    }

    if (dto.companyId) {
      await userCompanyValidator(dto?.companyId, userRequest);
    }

    const createdUser = await prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password, 10),
        gender: dto.gender,
        phone: dto.phone,
        organization: dto.organizationId
          ? {
              connect: {
                id: dto?.organizationId,
              },
            }
          : undefined,
        company: dto.companyId
          ? {
              connect: {
                id: dto?.companyId,
              },
            }
          : undefined,
        role: dto.roleId
          ? {
              connect: {
                id: dto?.roleId,
              },
            }
          : undefined,
        status: dto.status,
      },
      include: {
        role: true,
        organization: true,
        company: true,
        avatar: true,
      },
    });

    return new UserEntity(createdUser);
  }
}

export const userCreateService = new UserCreateService();
