import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { TokenSignService } from 'src/shared/services/token-sign.service';
import { TokenVerifyService } from 'src/shared/services/token-verify.service';
import { UserRequest } from 'src/shared/types/user-request';
import { statusValidator } from 'src/shared/validators/status.validator';
import { AuthRefreshResponseDto } from '../domain/dto/auth-refresh-response.dto';

@Injectable()
export class AuthRefreshService {
  constructor(
    private prisma: PrismaService,
    private tokenSignService: TokenSignService,
    private tokenVerifyService: TokenVerifyService,
  ) {}
  async execute(refreshToken: string): Promise<AuthRefreshResponseDto> {
    const payload: UserRequest = await this.tokenVerifyService.execute(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
    );

    if (!payload) throw new UnauthorizedException('Token inválido!');

    const user = await this.prisma.user.findFirst({
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
      token: await this.tokenSignService.execute(user, '10m'),
      refreshToken: await this.tokenSignService.execute(
        user,
        '10d',
        process.env.JWT_REFRESH_SECRET,
      ),
    };
  }
}
