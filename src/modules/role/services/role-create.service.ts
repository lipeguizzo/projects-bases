import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserRequest } from 'src/shared/types/user-request';
import { userCompanyValidator } from 'src/shared/validators/user-company.validator';
import { RoleCreateDto } from '../domain/dto/role-create.dto';
import { RoleEntity } from '../domain/entities/role.entity';
import { roleReferenceValidator } from '../validators/role-reference.validator';
import { userOrganizationValidator } from 'src/shared/validators/user-organization.validator';

@Injectable()
export class RoleCreateService {
  constructor(private prisma: PrismaService) {}
  async execute(
    dto: RoleCreateDto,
    userRequest: UserRequest,
  ): Promise<RoleEntity> {
    const role = await this.prisma.role.findFirst({
      where: {
        name: dto.name,
        organizationId: dto.organizationId ?? undefined,
        companyId: dto.companyId ?? undefined,
        deletedAt: null,
      },
    });

    if (role) throw new ConflictException('Perfil já cadastrado!');

    if (dto.reference) await roleReferenceValidator(dto.reference, userRequest);

    if (dto.organizationId) {
      await userOrganizationValidator(dto?.organizationId, userRequest);
    }

    if (dto.companyId) {
      await userCompanyValidator(dto?.companyId, userRequest);
    }

    const createdRole = await this.prisma.role.create({
      data: {
        name: dto.name,
        isDefault: dto.isDefault,
        reference: dto.reference,
        organization: dto.organizationId
          ? {
              connect: {
                id: dto?.organizationId,
              },
            }
          : undefined,
        company: dto.companyId
          ? {
              connect: {
                id: dto?.companyId,
              },
            }
          : undefined,
        status: dto.status,
      },
      include: {
        organization: true,
        company: true,
      },
    });

    await this.prisma.roleAbility.createMany({
      data: dto.abilitiesIds.map((abilityId) => {
        return {
          roleId: createdRole.id,
          abilityId: abilityId,
        };
      }),
    });

    return new RoleEntity(createdRole);
  }
}
