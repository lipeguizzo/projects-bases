import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

export async function userDeleteValidator(userId: number) {
  const prisma = new PrismaService();

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      deletedAt: null,
    },
  });

  if (!user) throw new NotFoundException('Usuário não encontrado!');
}
