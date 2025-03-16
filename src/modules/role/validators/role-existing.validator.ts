import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';

export async function roleExistingValidator(roleId: number) {
  const role = await prisma.role.findFirst({
    where: {
      id: roleId,
      deletedAt: null,
    },
  });

  if (!role) throw new NotFoundException('Perfil não encontrado!');
}
