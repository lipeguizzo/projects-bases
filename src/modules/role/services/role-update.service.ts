import { prisma } from '../../../infra/database/prisma.service';
import {
  ConflictException,
  NotFoundException,
} from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { userCompanyValidator } from '../../../shared/validators/user-company.validator';
import { RoleUpdateDto } from '../domain/dto/role-update.dto';
import { RoleEntity } from '../domain/entities/role.entity';
import { roleDefaultValidator } from '../validators/role-default.validator';
import { roleReferenceValidator } from '../validators/role-reference.validator';

class RoleUpdateService {
  async execute(
    id: number,
    dto: RoleUpdateDto,
    userRequest: UserRequest,
  ): Promise<RoleEntity> {
    const role = await prisma.role.findFirst({
      where: {
        id: id,
        organizationId: userRequest?.organizationId ?? undefined,
        companyId: userRequest?.companyId ?? undefined,
        deletedAt: null,
      },
    });

    if (!role) throw new NotFoundException('Perfil não encontrado!');

    await roleDefaultValidator(role);

    if (dto.reference) await roleReferenceValidator(dto.reference, userRequest);

    const existingRole = await prisma.role.findFirst({
      where: {
        NOT: {
          id: id,
        },
        name: dto.name,
        deletedAt: null,
      },
    });

    if (existingRole) throw new ConflictException('Perfil já cadastrado!');

    if (dto.companyId) {
      await userCompanyValidator(dto?.companyId, userRequest);
    }

    const updatedRole = await prisma.role.update({
      data: {
        name: dto.name,
        isDefault: dto.isDefault,
        reference: dto.reference,
        status: dto.status,
      },
      where: {
        id: id,
      },
      include: {
        organization: true,
        company: true,
      },
    });

    if (dto.abilitiesIds) {
      await prisma.roleAbility.deleteMany({
        where: { roleId: updatedRole.id },
      });
      await prisma.roleAbility.createMany({
        data: dto.abilitiesIds.map((abilityId) => {
          return {
            roleId: updatedRole.id,
            abilityId: abilityId,
          };
        }),
      });
    }

    return new RoleEntity(updatedRole);
  }
}

export const roleUpdateService = new RoleUpdateService();
