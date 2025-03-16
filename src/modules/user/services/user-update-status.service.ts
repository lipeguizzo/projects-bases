import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { UserUpdateStatusDto } from '../domain/dto/user-update-status.dto';
import { UserEntity } from '../domain/entities/user.entity';

class UserUpdateStatusService {
  async execute(
    id: number,
    dto: UserUpdateStatusDto,
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

    const updatedUser = await prisma.user.update({
      data: {
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

export const userUpdateStatusService = new UserUpdateStatusService();
