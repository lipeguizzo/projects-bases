import { $Enums } from '@prisma/client';
import { AuthRefreshResponseDto } from '../domain/dto/auth-refresh-response.dto';
import { UserRequest } from '../../../shared/types/user-request';
import { tokenVerifyService } from '../../../shared/services/token-verify.service';
import {
  NotFoundException,
  UnauthorizedException,
} from '../../../shared/exceptions';
import { prisma } from '../../../infra/database/prisma.service';
import { UserEntity } from '../../user/domain/entities/user.entity';
import { tokenSignService } from '../../../shared/services/token-sign.service';
import { statusValidator } from '../../../shared/validators/status.validator';

class AuthRefreshService {
  async execute(refreshToken: string): Promise<AuthRefreshResponseDto> {
    const payload: UserRequest = await tokenVerifyService.execute(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
    );

    if (!payload) throw new UnauthorizedException('Token inválido!');

    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
        deletedAt: null,
      },
      include: {
        role: true,
        company: true,
        avatar: true,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    statusValidator(user.status);

    return {
      user: new UserEntity(user),
      token: await tokenSignService.execute(user, '10m'),
      refreshToken: await tokenSignService.execute(
        user,
        '10d',
        process.env.JWT_REFRESH_SECRET,
      ),
    };
  }
}

export const authRefreshService = new AuthRefreshService();
