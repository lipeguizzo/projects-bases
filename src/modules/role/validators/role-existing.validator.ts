import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

export async function roleExistingValidator(roleId: number) {
  const prisma = new PrismaService();

  const role = await prisma.role.findFirst({
    where: {
      id: roleId,
      deletedAt: null,
    },
  });

  if (!role) throw new NotFoundException('Perfil não encontrado!');
}
