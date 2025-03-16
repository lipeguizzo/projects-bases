import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { RoleEntity } from '../domain/entities/role.entity';

class RoleFindOneService {
  async execute(id: number, userRequest: UserRequest): Promise<RoleEntity> {
    const role = await prisma.role.findFirst({
      where: {
        id: id,
        deletedAt: null,
        OR: [
          {
            organizationId: userRequest?.organizationId ?? undefined,
            companyId: userRequest?.companyId ?? undefined,
            isDefault: false,
          },
          {
            isDefault: true,
          },
        ],
      },
      include: {
        organization: true,
        company: true,
      },
    });

    if (!role) throw new NotFoundException('Perfil não encontrado!');

    return new RoleEntity(role);
  }
}

export const roleFindOneService = new RoleFindOneService();
