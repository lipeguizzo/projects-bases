from src.modules.role.models import Role
from src.shared.exceptions.not_found_exception import NotFoundException


def role_existing_validator(role_id: int):

    role = Role.objects.filter(id=role_id, deleted_at=None).first()

    if role is None:
        raise NotFoundException("Perfil não encontrado!")
