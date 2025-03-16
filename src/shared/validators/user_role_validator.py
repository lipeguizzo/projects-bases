from src.modules.role.models import Role
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.shared.types.user_request import UserRequest
from src.shared.exceptions.unauthorized_exception import UnauthorizedException
from src.shared.exceptions.not_found_exception import NotFoundException


def user_role_validator(role_id: int, user_request: UserRequest):

    if user_request is None:
        raise UnauthorizedException("Usuário não encontrado!")

    role = Role.objects.filter(id=role_id, deleted_at=None).first()

    if role is None:
        raise NotFoundException("Perfil não encontrado!")

    is_admin = user_request.role.reference == RoleReferences.ADMIN

    is_admin_organization = (
        user_request.role.reference == RoleReferences.ADMIN_ORGANIZATION
    )

    is_admin_company = user_request.role.reference == RoleReferences.ADMIN_COMPANY

    if role.reference == RoleReferences.ADMIN and is_admin:
        return

    if role.reference == RoleReferences.ADMIN_ORGANIZATION and is_admin:
        return

    if role.reference == RoleReferences.ADMIN_COMPANY and (
        is_admin or is_admin_organization
    ):
        return

    if role.reference == RoleReferences.CLIENT and (
        is_admin or is_admin_organization or is_admin_company
    ):
        return

    if user_request.role.id != role_id:
        raise UnauthorizedException("Usuário sem permissão nesse perfil!")
