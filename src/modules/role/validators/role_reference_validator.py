from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.shared.types.user_request import UserRequest
from src.shared.exceptions.unauthorized_exception import UnauthorizedException


def role_reference_validator(reference: RoleReferences, user_request: UserRequest):

    if user_request is None:
        raise UnauthorizedException("Usuário não encontrado!")

    is_admin = user_request.role.reference == RoleReferences.ADMIN

    is_admin_organization = (
        user_request.role.reference == RoleReferences.ADMIN_ORGANIZATION
    )

    is_admin_company = user_request.role.reference == RoleReferences.ADMIN_COMPANY

    if reference == RoleReferences.ADMIN and is_admin:
        return

    if reference == RoleReferences.ADMIN_ORGANIZATION and is_admin:
        return

    if reference == RoleReferences.ADMIN_COMPANY and (
        is_admin or is_admin_organization
    ):
        return

    if reference == RoleReferences.CLIENT and (
        is_admin or is_admin_organization or is_admin_company
    ):
        return

    if user_request.role.reference != reference:
        raise UnauthorizedException("Usuário sem permissão nesse perfil!")
