import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { UserEntity } from '../domain/entities/user.entity';
import { userDeleteValidator } from '../validators/user-delete.validator';
import { userDeleteAvatarService } from './user-delete-avatar.service';

class UserDeleteService {
  async execute(id: number, userRequest: UserRequest): Promise<UserEntity> {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
        organizationId: userRequest?.organizationId ?? undefined,
        companyId: userRequest?.companyId ?? undefined,
        deletedAt: null,
      },
      include: {
        avatar: true,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    await userDeleteValidator(id);

    if (user.avatar) await userDeleteAvatarService.execute(id, userRequest);

    const updatedUser = await prisma.user.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: id,
      },
    });

    return new UserEntity(updatedUser);
  }
}

export const userDeleteService = new UserDeleteService();
