import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';

export async function organizationExistingValidator(organizationId: number) {
  const organization = await prisma.organization.findFirst({
    where: {
      id: organizationId,
    },
  });

  if (!organization) throw new NotFoundException('Organização não encontrada!');
}
