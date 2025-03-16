from src.modules.organization.models import Organization
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.shared.types.user_request import UserRequest
from src.shared.exceptions.unauthorized_exception import UnauthorizedException
from src.shared.exceptions.not_found_exception import NotFoundException


def user_organization_validator(organization_id: int, user_request: UserRequest):

    if user_request is None:
        raise UnauthorizedException("Usuário não encontrado!")

    organization = Organization.objects.filter(
        id=organization_id, deleted_at=None
    ).first()

    if organization is None:
        raise NotFoundException("Organização não encontrada!")

    if user_request.role.reference == RoleReferences.ADMIN:
        return

    if user_request.organization.id != organization_id:
        raise UnauthorizedException("Usuário sem permissão nessa organização")
