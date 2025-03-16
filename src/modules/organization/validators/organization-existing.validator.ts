import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

export async function organizationExistingValidator(organizationId: number) {
  const prisma = new PrismaService();

  const organization = await prisma.organization.findFirst({
    where: {
      id: organizationId,
      deletedAt: null,
    },
  });

  if (!organization) throw new NotFoundException('Organização não encontrada!');
}
