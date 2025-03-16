from typing import List
from src.shared.types.user_request import UserRequest
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.shared.exceptions.unauthorized_exception import UnauthorizedException


def role_reference_permission(user_request: UserRequest) -> list[RoleReferences]:
    if user_request is None:
        raise UnauthorizedException("Usuário não encontrado!")

    reference_permissions: list[RoleReferences] = []

    is_admin = user_request.role.reference == RoleReferences.ADMIN
    is_admin_organization = (
        user_request.role.reference == RoleReferences.ADMIN_ORGANIZATION
    )
    is_admin_company = user_request.role.reference == RoleReferences.ADMIN_COMPANY
    is_client = user_request.role.reference == RoleReferences.CLIENT

    if is_admin:
        reference_permissions.append(RoleReferences.ADMIN)

    if is_admin or is_admin_organization:
        reference_permissions.append(RoleReferences.ADMIN_ORGANIZATION)

    if is_admin or is_admin_organization or is_admin_company:
        reference_permissions.append(RoleReferences.ADMIN_COMPANY)

    if is_admin or is_admin_organization or is_admin_company or is_client:
        reference_permissions.append(RoleReferences.CLIENT)

    return reference_permissions
