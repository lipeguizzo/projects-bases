import { $Enums } from '@prisma/client';
import { UserRequest } from '../../../shared/types/user-request';
import {
  NotFoundException,
  UnauthorizedException,
} from '../../../shared/exceptions';

export async function roleReferenceValidator(
  reference: $Enums.RoleReferences,
  userRequest: UserRequest,
) {
  if (!userRequest) throw new UnauthorizedException('Usuário não encontrado!');

  const isAdmin: boolean =
    userRequest.role?.reference === $Enums.RoleReferences.ADMIN;

  const isAdminOrganization: boolean =
    userRequest.role?.reference === $Enums.RoleReferences.ADMIN_ORGANIZATION;

  const isAdminCompany: boolean =
    userRequest.role?.reference === $Enums.RoleReferences.ADMIN_COMPANY;

  const isCLient: boolean =
    userRequest.role?.reference === $Enums.RoleReferences.CLIENT;

  if (!reference) throw new NotFoundException('Referência não encontrada!');

  if (userRequest.role?.reference === $Enums.RoleReferences.ADMIN && isAdmin)
    return;

  if (
    reference === $Enums.RoleReferences.ADMIN_ORGANIZATION &&
    (isAdmin || isAdminOrganization)
  )
    return;

  if (
    reference === $Enums.RoleReferences.ADMIN_COMPANY &&
    (isAdmin || isAdminOrganization || isAdminCompany)
  )
    return;

  if (
    reference === $Enums.RoleReferences.CLIENT &&
    (isAdmin || isAdminOrganization || isAdminCompany || isCLient)
  )
    return;

  if (userRequest?.role?.reference !== reference)
    throw new UnauthorizedException('Usuário sem permissão nesse perfil!');
}
