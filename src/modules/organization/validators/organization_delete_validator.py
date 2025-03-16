from src.modules.organization.models import Organization
from src.modules.company.models import Company
from src.modules.user.models import User
from src.modules.role.models import Role
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.exceptions.conflict_exception import ConflictException


def organization_delete_validator(organization_id: int):

    organization = Organization.objects.filter(
        id=organization_id, deleted_at=None
    ).first()

    if organization is None:
        raise NotFoundException("Organização não encontrada!")

    has_companies = Company.objects.filter(
        organization__id=organization_id, deleted_at=None
    ).first()

    if has_companies is not None:
        raise ConflictException(
            "Não foi possível deletar organização por que possui empresas vinculadas!"
        )

    has_users = User.objects.filter(
        organization__id=organization_id, deleted_at=None
    ).first()

    if has_users is not None:
        raise ConflictException(
            "Não foi possível deletar organização por que possui usuários vinculados!"
        )

    has_roles = Role.objects.filter(
        organization__id=organization_id, deleted_at=None
    ).first()

    if has_roles is not None:
        raise ConflictException(
            "Não foi possível deletar organização por que possui perfis vinculados!"
        )
