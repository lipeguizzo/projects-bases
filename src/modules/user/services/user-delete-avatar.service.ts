import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { storedFileDeleteService } from '../../stored-file/services/stored-file-delete.service';
import { UserEntity } from '../domain/entities/user.entity';

class UserDeleteAvatarService {
  async execute(id: number, userRequest: UserRequest): Promise<UserEntity> {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
        organizationId: userRequest?.organizationId ?? undefined,
        companyId: userRequest?.companyId ?? undefined,
        deletedAt: null,
      },
      include: {
        role: true,
        organization: true,
        company: true,
        avatar: true,
      },
    });

    if (!user) throw new NotFoundException('Arquivo não encontrado!');

    const updatedUser = await prisma.user.update({
      data: {
        avatarId: null,
      },
      where: {
        id: user.id,
      },
      include: {
        role: true,
        organization: true,
        company: true,
        avatar: true,
      },
    });

    if (user.avatar) await storedFileDeleteService.execute(user.avatar.uuid);

    return new UserEntity(updatedUser);
  }
}

export const userDeleteAvatarService = new UserDeleteAvatarService();
