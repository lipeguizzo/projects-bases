import { $Enums } from '@prisma/client';
import { UserRequest } from '../types/user-request';
import { prisma } from '../../infra/database/prisma.service';
import { NotFoundException, UnauthorizedException } from '../exceptions';

export async function userOrganizationValidator(
  organizationId: number,
  userRequest: UserRequest,
) {
  if (!userRequest) throw new UnauthorizedException('Usuário não encontrado!');

  const organization = await prisma.organization.findFirst({
    where: {
      id: organizationId,
      deletedAt: null,
    },
  });

  if (!organization) throw new NotFoundException('Organização não encontrada!');

  if (userRequest.role?.reference === $Enums.RoleReferences.ADMIN) return;

  if (userRequest.organizationId !== organizationId)
    throw new UnauthorizedException('Usuário sem permissão nessa organização');
}
