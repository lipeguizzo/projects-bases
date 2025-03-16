import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserRequest } from 'src/shared/types/user-request';
import { userRoleValidator } from 'src/shared/validators/user-role.validator';
import { UserUpdateSelfDto } from '../domain/dto/user-update-self.dto';
import { UserEntity } from '../domain/entities/user.entity';

@Injectable()
export class UserUpdateSelfService {
  constructor(private prisma: PrismaService) {}
  async execute(
    dto: UserUpdateSelfDto,
    userRequest: UserRequest,
  ): Promise<UserEntity> {
    if (!userRequest) throw new NotFoundException('Usuário não encontrado!');

    const user = await this.prisma.user.findFirst({
      where: {
        id: userRequest.id,
        deletedAt: null,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    const existingUser = await this.prisma.user.findFirst({
      where: {
        NOT: {
          id: userRequest.id,
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

    const updatedUser = await this.prisma.user.update({
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
        id: userRequest.id,
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
