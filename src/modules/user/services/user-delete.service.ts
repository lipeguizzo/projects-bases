import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserEntity } from '../domain/entities/user.entity';
import { UserRequest } from 'src/shared/types/user-request';
import { userDeleteValidator } from '../validators/user-delete.validator';
import { UserDeleteAvatarService } from './user-delete-avatar.service';

@Injectable()
export class UserDeleteService {
  constructor(
    private prisma: PrismaService,
    private userDeleteAvatarService: UserDeleteAvatarService,
  ) {}
  async execute(id: number, userRequest: UserRequest): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
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

    if (user.avatar)
      await this.userDeleteAvatarService.execute(id, userRequest);

    const updatedUser = await this.prisma.user.update({
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
