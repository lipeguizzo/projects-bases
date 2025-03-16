import { $Enums } from '@prisma/client';
import { UserRequest } from '../../../shared/types/user-request';
import { UnauthorizedException } from '../../../shared/exceptions';

interface IReferencePermission {
  reference: $Enums.RoleReferences;
}

export function roleReferencePermission(
  userRequest: UserRequest,
): IReferencePermission[] {
  if (!userRequest) throw new UnauthorizedException('Usuário não encontrado!');

  const referencePermissions: IReferencePermission[] = [];

  const isAdmin: boolean =
    userRequest.role?.reference === $Enums.RoleReferences.ADMIN;

  const isAdminOrganization: boolean =
    userRequest.role?.reference === $Enums.RoleReferences.ADMIN_ORGANIZATION;

  const isAdminCompany: boolean =
    userRequest.role?.reference === $Enums.RoleReferences.ADMIN_COMPANY;

  const isCLient: boolean =
    userRequest.role?.reference === $Enums.RoleReferences.CLIENT;

  if (isAdmin)
    referencePermissions.push({
      reference: $Enums.RoleReferences.ADMIN,
    });

  if (isAdmin || isAdminOrganization)
    referencePermissions.push({
      reference: $Enums.RoleReferences.ADMIN_ORGANIZATION,
    });

  if (isAdmin || isAdminOrganization || isAdminCompany)
    referencePermissions.push({
      reference: $Enums.RoleReferences.ADMIN_COMPANY,
    });

  if (isAdmin || isAdminOrganization || isAdminCompany || isCLient)
    referencePermissions.push({
      reference: $Enums.RoleReferences.CLIENT,
    });

  return referencePermissions;
}
