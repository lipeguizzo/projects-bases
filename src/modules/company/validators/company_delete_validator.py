from src.modules.company.models import Company
from src.modules.user.models import User
from src.modules.role.models import Role
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.exceptions.conflict_exception import ConflictException


def company_delete_validator(company_id: int):

    company = Company.objects.filter(id=company_id, deleted_at=None).first()

    if company is None:
        raise NotFoundException("Empresa não encontrada!")

    has_users = User.objects.filter(company__id=company_id, deleted_at=None).first()

    if has_users is not None:
        raise ConflictException(
            "Não foi possível deletar empresa por que possui usuários vinculados!"
        )

    has_roles = Role.objects.filter(company__id=company_id, deleted_at=None).first()

    if has_roles is not None:
        raise ConflictException(
            "Não foi possível deletar empresa por que possui perfis vinculados!"
        )
