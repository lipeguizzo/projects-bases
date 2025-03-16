import { roleDefaultValidator } from '../validators/role-default.validator';
import { roleReferenceValidator } from '../validators/role-reference.validator';
import { roleDeleteValidator } from '../validators/role-delete.validator';
import { UserRequest } from '../../../shared/types/user-request';
import { RoleEntity } from '../domain/entities/role.entity';
import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';

class RoleDeleteService {
  async execute(id: number, userRequest: UserRequest): Promise<RoleEntity> {
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

    if (role.reference)
      await roleReferenceValidator(role.reference, userRequest);

    await roleDeleteValidator(id);

    const updatedRole = await prisma.role.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: id,
      },
      include: {
        organization: true,
        company: true,
      },
    });

    await prisma.roleAbility.deleteMany({
      where: { roleId: updatedRole.id },
    });

    return new RoleEntity(updatedRole);
  }
}

export const roleDeleteService = new RoleDeleteService();
