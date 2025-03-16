import { ConflictException, Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { AuthRegisterDto } from '../domain/dto/auth-register.dto';
import { EMailTemplate } from 'src/modules/mail/domain/enums/mail-template.enum';
import { IMailOption } from 'src/modules/mail/domain/interfaces/mail-option.interface';
import { MailService } from 'src/modules/mail/services/mail.service';
import { IAuthOrganizationActivation } from '../domain/interfaces/auth-organization-activation.interface';

@Injectable()
export class AuthRegisterService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}
  async execute(dto: AuthRegisterDto): Promise<UserEntity> {
    const isAdminOrganization: boolean =
      dto.reference === $Enums.RoleReferences.ADMIN_ORGANIZATION;

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ name: dto.name }, { email: dto.email }],
        deletedAt: null,
      },
    });

    if (user)
      throw new ConflictException('Nome ou e-mail de Usuário já cadastrado!');

    const organization = await this.prisma.organization.findFirst({
      where: {
        OR: [{ name: dto.organizationName }, { email: dto.organizationEmail }],
        deletedAt: null,
      },
    });
    if (organization)
      throw new ConflictException(
        'Nome ou e-mail da organização já cadastrado!',
      );

    const createdUser = await this.prisma.user.create({
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
                name: dto.organizationName,
                tradeName: dto.organizationTradeName,
                email: dto.organizationEmail,
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
        to: process.env.ADMIN_EMAIL,
        subject: 'Cadastro de organização:',
        template: EMailTemplate.ORGANIZATION_ACTIVATION,
        context: {
          name: createdUser?.organization?.name,
          url: `${process.env.FRONT_END_URL}`,
        },
      };

      await this.mailService.send(options);
    }

    return new UserEntity(createdUser);
  }
}
