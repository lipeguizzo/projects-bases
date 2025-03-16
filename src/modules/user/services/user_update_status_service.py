from django.db.models import Q
from src.shared.types.user_request import UserRequest
from src.modules.user.models import User
from src.modules.user.domain.dto.user_update_status_dto import (
    UserUpdateStatusDTO,
)
from src.shared.exceptions.not_found_exception import NotFoundException


class UserUpdateStatusService:
    @classmethod
    def execute(self, id: int, dto: UserUpdateStatusDTO, user_request: UserRequest):

        user = User.objects.filter(
            Q(id=id)
            & Q(deleted_at=None)
            & (
                Q(organization__id=user_request.organization.id)
                if user_request.organization
                else Q()
            )
            & (Q(company__id=user_request.company.id) if user_request.company else Q())
        ).first()

        if user is None:
            raise NotFoundException("Usuário não encontrado!")

        user.status = dto.status

        user.save()

        return user
