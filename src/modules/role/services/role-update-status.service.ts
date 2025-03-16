import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { RoleUpdateStatusDto } from '../domain/dto/role-update-status.dto';
import { RoleEntity } from '../domain/entities/role.entity';
import { roleDefaultValidator } from '../validators/role-default.validator';
import { roleReferenceValidator } from '../validators/role-reference.validator';

class RoleUpdateStatusService {
  async execute(
    id: number,
    dto: RoleUpdateStatusDto,
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

    if (role.reference)
      await roleReferenceValidator(role.reference, userRequest);

    const updatedRole = await prisma.role.update({
      data: {
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

    return new RoleEntity(updatedRole);
  }
}

export const roleUpdateStatusService = new RoleUpdateStatusService();
