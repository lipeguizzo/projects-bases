import { prisma } from '../../../infra/database/prisma.service';
import { ConflictException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userCompanyValidator } from '../../../shared/validators/user-company.validator';
import { userOrganizationValidator } from '../../../shared/validators/user-organization.validator';
import { RoleCreateDto } from '../domain/dto/role-create.dto';
import { RoleEntity } from '../domain/entities/role.entity';
import { roleReferenceValidator } from '../validators/role-reference.validator';

class RoleCreateService {
  async execute(
    dto: RoleCreateDto,
    userRequest: UserRequest,
  ): Promise<RoleEntity> {
    const role = await prisma.role.findFirst({
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

    const createdRole = await prisma.role.create({
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

    await prisma.roleAbility.createMany({
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

export const roleCreateService = new RoleCreateService();
