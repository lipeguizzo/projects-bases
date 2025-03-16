import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { UserEntity } from '../domain/entities/user.entity';

class UserFindOneService {
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

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    return new UserEntity(user);
  }
}

export const userFindOneService = new UserFindOneService();
