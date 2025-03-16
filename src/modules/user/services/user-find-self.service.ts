import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { UserEntity } from '../domain/entities/user.entity';

class UserFindSelfService {
  async execute(userRequest: UserRequest): Promise<UserEntity> {
    if (!userRequest) throw new NotFoundException('Usuário não encontrado!');

    const user = await prisma.user.findFirst({
      where: {
        id: userRequest.id,
        deletedAt: null,
      },
      include: {
        role: true,
        organization: true,
        company: true,
        avatar: true,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    return new UserEntity(user);
  }
}

export const userFindSelfService = new UserFindSelfService();
