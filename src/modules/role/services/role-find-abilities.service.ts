import { AbilityEntity } from './../domain/entities/ability.entity';
import { UserRequest } from '../../../shared/types/user-request';
import { NotFoundException } from '../../../shared/exceptions';
import { prisma } from '../../../infra/database/prisma.service';

class RoleFindAbilitiesService {
  async execute(
    id: number,
    userRequest: UserRequest,
  ): Promise<AbilityEntity[]> {
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
    });

    if (!role) throw new NotFoundException('Perfil não encontrado!');
    const findAbilities = await prisma.ability.findMany({
      where: {
        rolesAbilities: {
          some: {
            roleId: id,
          },
        },
      },
    });

    return findAbilities.map((ability) => new AbilityEntity(ability));
  }
}

export const roleFindAbilitiesService = new RoleFindAbilitiesService();
