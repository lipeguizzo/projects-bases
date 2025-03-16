import { hash } from 'bcryptjs';
import { AuthResetPasswordDto } from '../domain/dto/auth-reset-password.dto';
import { UserEntity } from '../../user/domain/entities/user.entity';
import { tokenVerifyService } from '../../../shared/services/token-verify.service';
import { UnauthorizedException } from '../../../shared/exceptions';
import { prisma } from '../../../infra/database/prisma.service';

class AuthResetPasswordService {
  async execute(dto: AuthResetPasswordDto): Promise<UserEntity> {
    const user = await tokenVerifyService.execute(dto.token);

    if (!user) throw new UnauthorizedException('Token inválido!');

    const updatedUser = await prisma.user.update({
      data: {
        password: await hash(dto.password, 10),
      },
      where: { id: user.id },
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

export const authResetPasswordService = new AuthResetPasswordService();
