from src.modules.user.models import User
from src.modules.role.models import Role
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.exceptions.conflict_exception import ConflictException


def role_delete_validator(role_id: int):

    role = Role.objects.filter(id=role_id, deleted_at=None).first()

    if role is None:
        raise NotFoundException("Perfil não encontrado!")

    has_users = User.objects.filter(role__id=role_id, deleted_at=None).first()

    if has_users is not None:
        raise ConflictException(
            "Não foi possível deletar perfil por que possui usuários vinculados!"
        )
