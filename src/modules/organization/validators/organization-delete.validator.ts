import { prisma } from '../../../infra/database/prisma.service';
import {
  ConflictException,
  NotFoundException,
} from '../../../shared/exceptions';

export async function organizationDeleteValidator(organizationId: number) {
  const organization = await prisma.organization.findFirst({
    where: {
      id: organizationId,
      deletedAt: null,
    },
  });

  if (!organization) throw new NotFoundException('Organização não encontrada!');

  const hasCompanies = await prisma.company.findFirst({
    where: {
      organizationId: organizationId,
      deletedAt: null,
    },
  });

  if (hasCompanies)
    throw new ConflictException(
      'Não foi possível deletar organização por que possui empresas vinculadas!',
    );

  const hasUsers = await prisma.user.findFirst({
    where: {
      organizationId: organizationId,
      deletedAt: null,
    },
  });

  if (hasUsers)
    throw new ConflictException(
      'Não foi possível deletar organização por que possui usuários vinculados!',
    );

  const hasRoles = await prisma.role.findFirst({
    where: {
      organizationId: organizationId,
      deletedAt: null,
    },
  });

  if (hasRoles)
    throw new ConflictException(
      'Não foi possível deletar organização por que possui perfis vinculados!',
    );
}
