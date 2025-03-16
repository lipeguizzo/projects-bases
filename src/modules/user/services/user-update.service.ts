import { hash } from 'bcryptjs';
import { UserUpdateDto } from '../domain/dto/user-update.dto';
import { UserEntity } from '../domain/entities/user.entity';
import { UserRequest } from '../../../shared/types/user-request';
import { prisma } from '../../../infra/database/prisma.service';
import {
  ConflictException,
  NotFoundException,
} from '../../../shared/exceptions';
import { userRoleValidator } from '../../../shared/validators/user-role.validator';

class UserUpdateService {
  async execute(
    id: number,
    dto: UserUpdateDto,
    userRequest: UserRequest,
  ): Promise<UserEntity> {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
        organizationId: userRequest?.organizationId ?? undefined,
        companyId: userRequest?.companyId ?? undefined,
        deletedAt: null,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    const existingUser = await prisma.user.findFirst({
      where: {
        NOT: {
          id: id,
        },
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

    if (existingUser) throw new ConflictException('Usuário já cadastrado!');

    if (dto.roleId) await userRoleValidator(dto?.roleId, userRequest);

    const updatedUser = await prisma.user.update({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password, 10),
        gender: dto.gender,
        phone: dto.phone,
        role: dto.roleId
          ? {
              connect: {
                id: dto?.roleId,
              },
            }
          : undefined,
        status: dto.status,
      },
      where: {
        id: id,
      },
      include: {
        role: true,
        organization: true,
        company: true,
        avatar: true,
      },
    });

    return new UserEntity(updatedUser);
  }
}

export const userUpdateService = new UserUpdateService();
