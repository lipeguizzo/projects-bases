import { ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

export async function companyDeleteValidator(companyId: number) {
  const prisma = new PrismaService();

  const company = await prisma.company.findFirst({
    where: {
      id: companyId,
      deletedAt: null,
    },
  });

  if (!company) throw new NotFoundException('Empresa não encontrada!');

  const hasUsers = await prisma.user.findFirst({
    where: {
      companyId: companyId,
      deletedAt: null,
    },
  });

  if (hasUsers)
    throw new ConflictException(
      'Não foi possível deletar empresa por que possui usuários vinculados!',
    );

  const hasRoles = await prisma.role.findFirst({
    where: {
      companyId: companyId,
      deletedAt: null,
    },
  });

  if (hasRoles)
    throw new ConflictException(
      'Não foi possível deletar empresa por que possui perfis vinculados!',
    );
}
