import { AuthRecoverPasswordDto } from '../domain/dto/auth-recover-password.dto';
import { AuthRecoverPasswordResponseDto } from '../domain/dto/auth-recover-password-response.dto';
import { IAuthRecoverPassword } from '../domain/interfaces/auth-recover-password.interface';
import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { tokenSignService } from '../../../shared/services/token-sign.service';
import { IMailOption } from '../../mail/domain/interfaces/mail-option.interface';
import { EMailTemplate } from '../../mail/domain/enums/mail-template.enum';
import { mailService } from '../../mail/services/mail.service';

class AuthRecoverPasswordService {
  async execute(
    dto: AuthRecoverPasswordDto,
  ): Promise<AuthRecoverPasswordResponseDto> {
    const user = await prisma.user.findFirst({
      where: {
        email: dto.email,
        deletedAt: null,
      },
    });

    if (!user) throw new NotFoundException('E-mail incorreto!');

    const token = await tokenSignService.execute(user, '10m');

    const url = `${process.env.FRONT_END_URL}/recuperar-senha/nova-senha?token=${token}`;

    const options: IMailOption<IAuthRecoverPassword> = {
      to: user.email,
      subject: 'Recuperação de Senha:',
      template: EMailTemplate.RECOVER_PASSWORD,
      context: {
        name: user.name,
        url: url,
      },
    };

    await mailService.send(options);

    return { message: 'E-mail enviado com sucesso!' };
  }
}

export const authRecoverPasswordService = new AuthRecoverPasswordService();
