import { $Enums } from '@prisma/client';
import { compare } from 'bcryptjs';
import { AuthLoginResponseDto } from '../domain/dto/auth-login-response.dto';
import { AuthLoginDto } from '../domain/dto/auth-login.dto';
import { prisma } from '../../../infra/database/prisma.service';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '../../../shared/exceptions';
import { UserEntity } from '../../user/domain/entities/user.entity';
import { tokenSignService } from '../../../shared/services/token-sign.service';
import { statusValidator } from '../../../shared/validators/status.validator';

class AuthLoginService {
  async execute(dto: AuthLoginDto): Promise<AuthLoginResponseDto> {
    const user = await prisma.user.findFirst({
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
      token: await tokenSignService.execute(user, '10d'),
      refreshToken: await tokenSignService.execute(
        user,
        '10d',
        process.env.JWT_REFRESH_SECRET,
      ),
    };
  }
}

export const authLoginService = new AuthLoginService();
