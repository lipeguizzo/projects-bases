import { $Enums } from '@prisma/client';
import { hash } from 'bcryptjs';
import { AuthRegisterDto } from '../domain/dto/auth-register.dto';
import { IAuthOrganizationActivation } from '../domain/interfaces/auth-organization-activation.interface';
import { UserEntity } from '../../user/domain/entities/user.entity';
import { prisma } from '../../../infra/database/prisma.service';
import { ConflictException } from '../../../shared/exceptions';
import { IMailOption } from '../../mail/domain/interfaces/mail-option.interface';
import { EMailTemplate } from '../../mail/domain/enums/mail-template.enum';
import { mailService } from '../../mail/services/mail.service';

class AuthRegisterService {
  async execute(dto: AuthRegisterDto): Promise<UserEntity> {
    const isAdminOrganization: boolean =
      dto.reference === $Enums.RoleReferences.ADMIN_ORGANIZATION;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ name: dto.name }, { email: dto.email }],
        deletedAt: null,
      },
    });

    if (user)
      throw new ConflictException('Nome ou e-mail de Usuário já cadastrado!');

    const organization = await prisma.organization.findFirst({
      where: {
        OR: [{ name: dto.organizationName }, { email: dto.organizationEmail }],
        deletedAt: null,
      },
    });
    if (organization)
      throw new ConflictException(
        'Nome ou e-mail da organização já cadastrado!',
      );

    const createdUser = await prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        gender: dto.gender,
        phone: dto.phone,
        status: isAdminOrganization
          ? $Enums.Status.WAITING
          : $Enums.Status.ACTIVE,
        password: await hash(dto.password, 10),
        role: {
          connect: {
            id: isAdminOrganization ? 2 : 4,
          },
        },
        organization: isAdminOrganization
          ? {
              create: {
                name: String(dto.organizationName),
                tradeName: String(dto.organizationTradeName),
                email: String(dto.organizationEmail),
                status: $Enums.Status.WAITING,
                address: {
                  create: dto.address,
                },
              },
            }
          : undefined,
      },
      include: {
        role: true,
        organization: true,
        company: true,
        avatar: true,
      },
    });

    if (isAdminOrganization) {
      const options: IMailOption<IAuthOrganizationActivation> = {
        to: String(process.env.ADMIN_EMAIL),
        subject: 'Cadastro de organização:',
        template: EMailTemplate.ORGANIZATION_ACTIVATION,
        context: {
          name: String(createdUser?.organization?.name),
          url: `${process.env.FRONT_END_URL}`,
        },
      };

      await mailService.send(options);
    }

    return new UserEntity(createdUser);
  }
}

export const authRegisterService = new AuthRegisterService();
