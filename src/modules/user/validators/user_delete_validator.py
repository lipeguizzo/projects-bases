from src.modules.user.models import User
from src.shared.exceptions.not_found_exception import NotFoundException


def user_delete_validator(user_id: int):

    user = User.objects.filter(id=user_id, deleted_at=None).first()

    if user is None:
        raise NotFoundException("Usuário não encontrado!")
