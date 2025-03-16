import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { TokenSignService } from 'src/shared/services/token-sign.service';
import { statusValidator } from 'src/shared/validators/status.validator';
import { AuthLoginResponseDto } from '../domain/dto/auth-login-response.dto';
import { AuthLoginDto } from '../domain/dto/auth-login.dto';

@Injectable()
export class AuthLoginService {
  constructor(
    private prisma: PrismaService,
    private tokenSignService: TokenSignService,
  ) {}
  async execute(dto: AuthLoginDto): Promise<AuthLoginResponseDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
        deletedAt: null,
      },
      include: {
        role: true,
        organization: true,
        company: true,
        avatar: true,
      },
    });

    if (!user) throw new NotFoundException('E-mail incorreto!');

    statusValidator(user.status);

    const passwordsMatched = await compare(dto.password, user.password);

    if (!passwordsMatched) throw new ConflictException('Senha incorreta!');

    return {
      user: new UserEntity(user),
      token: await this.tokenSignService.execute(user, '10d'),
      refreshToken: await this.tokenSignService.execute(
        user,
        '10d',
        process.env.JWT_REFRESH_SECRET,
      ),
    };
  }
}
