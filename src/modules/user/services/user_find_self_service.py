from src.modules.user.models import User
from src.shared.types.user_request import UserRequest
from src.shared.exceptions.not_found_exception import NotFoundException


class UserFindSelfService:
    @classmethod
    def execute(self, user_request: UserRequest):

        user = User.objects.filter(id=user_request.id, deleted_at=None).first()

        if user is None:
            raise NotFoundException("Usuário não encontrado!")

        return user
