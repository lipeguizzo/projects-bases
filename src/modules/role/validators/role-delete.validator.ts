import { prisma } from '../../../infra/database/prisma.service';
import {
  ConflictException,
  NotFoundException,
} from '../../../shared/exceptions';

export async function roleDeleteValidator(roleId: number) {
  const role = await prisma.role.findFirst({
    where: {
      id: roleId,
      deletedAt: null,
    },
  });

  if (!role) throw new NotFoundException('Perfil não encontrado!');

  const hasUsers = await prisma.user.findFirst({
    where: {
      roleId: roleId,
      deletedAt: null,
    },
  });

  if (hasUsers)
    throw new ConflictException(
      'Não foi possível deletar perfil por que possui usuários vinculados!',
    );
}
