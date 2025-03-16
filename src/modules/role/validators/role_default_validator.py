from src.modules.role.models import Role
from src.shared.exceptions.conflict_exception import ConflictException


def role_default_validator(role: Role):

    if role.is_default == True:
        raise ConflictException("Perfil padrão, não possível atualizar ou deletar!")
