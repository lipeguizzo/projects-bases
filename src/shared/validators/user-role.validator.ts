import { $Enums } from '@prisma/client';
import { UserRequest } from '../types/user-request';
import { PrismaService } from 'src/infra/database/prisma.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export async function userRoleValidator(
  roleId: number,
  userRequest: UserRequest,
) {
  const prisma = new PrismaService();

  if (!userRequest) throw new UnauthorizedException('Usuário não encontrado!');

  const role = await prisma.role.findFirst({
    where: {
      id: roleId,
      deletedAt: null,
    },
  });

  const isAdmin: boolean =
    userRequest.role?.reference === $Enums.RoleReferences.ADMIN;

  const isAdminOrganization: boolean =
    userRequest.role?.reference === $Enums.RoleReferences.ADMIN_ORGANIZATION;

  const isAdminCompany: boolean =
    userRequest.role?.reference === $Enums.RoleReferences.ADMIN_COMPANY;

  if (!role) throw new NotFoundException('Perfil não encontrado!');

  if (role?.reference === $Enums.RoleReferences.ADMIN && isAdmin) return;

  if (role?.reference === $Enums.RoleReferences.ADMIN_ORGANIZATION && isAdmin)
    return;

  if (
    role?.reference === $Enums.RoleReferences.ADMIN_COMPANY &&
    (isAdmin || isAdminOrganization)
  )
    return;

  if (
    role?.reference === $Enums.RoleReferences.CLIENT &&
    (isAdmin || isAdminOrganization || isAdminCompany)
  )
    return;

  if (userRequest.roleId !== roleId)
    throw new UnauthorizedException('Usuário sem permissão nesse perfil!');
}
