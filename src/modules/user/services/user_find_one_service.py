from django.db.models import Q
from src.modules.user.models import User
from src.shared.types.user_request import UserRequest
from src.shared.exceptions.not_found_exception import NotFoundException


class UserFindOneService:
    @classmethod
    def execute(self, id: int, user_request: UserRequest):

        user = User.objects.filter(
            Q(id=id, deleted_at=None)
            & (
                Q(organization_id=user_request.organization_id)
                if user_request and user_request.organization_id
                else Q()
            )
            & (
                Q(company_id=user_request.company_id)
                if user_request and user_request.company_id
                else Q()
            )
        ).first()

        if user is None:
            raise NotFoundException("Usuário não encontrado!")

        return user
