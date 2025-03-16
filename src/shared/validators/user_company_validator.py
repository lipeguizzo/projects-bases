from src.modules.company.models import Company
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.shared.types.user_request import UserRequest
from src.shared.exceptions.unauthorized_exception import UnauthorizedException
from src.shared.exceptions.not_found_exception import NotFoundException


def user_company_validator(company_id: int, user_request: UserRequest):

    if user_request is None:
        raise UnauthorizedException("Usuário não encontrado!")

    company = Company.objects.filter(id=company_id, deleted_at=None).first()

    if company is None:
        raise NotFoundException("Empresa não encontrada!")

    if user_request.role.reference == RoleReferences.ADMIN:
        return

    if (
        user_request.role.reference == RoleReferences.ADMIN_ORGANIZATION
        and user_request.organization.id == company.organization.id
    ):
        return

    if user_request.company.id != company_id:
        raise UnauthorizedException("Usuário sem permissão nessa empresa")
