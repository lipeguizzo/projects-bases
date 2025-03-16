from django.db.models import Q
from django.utils import timezone
from src.shared.types.user_request import UserRequest
from src.modules.user.models import User
from src.shared.exceptions.not_found_exception import NotFoundException
from src.modules.user.validators.user_delete_validator import user_delete_validator
from src.modules.user.services.user_delete_avatar_service import (
    UserDeleteAvatarService,
)


class UserDeleteService:
    @classmethod
    def execute(self, id: int, user_request: UserRequest):

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

        user_delete_validator(id)

        if user.avatar is not None:
            user = UserDeleteAvatarService.execute(id, user_request)

        user.deleted_at = timezone.now()
        user.save()

        return user
