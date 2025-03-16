from django.db.models import Q
from src.shared.types.user_request import UserRequest
from src.modules.role.models import Role
from src.modules.user.models import User
from src.modules.user.domain.dto.user_update_self_dto import (
    UserUpdateSelfDTO,
)
from src.shared.exceptions.conflict_exception import ConflictException
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_role_validator import (
    user_role_validator,
)
from src.shared.utils.hash import hash
from src.modules.user.validators.user_password_validator import user_password_validator


class UserUpdateSelfService:
    @classmethod
    def execute(self, dto: UserUpdateSelfDTO, user_request: UserRequest):

        user = User.objects.filter(id=user_request.id, deleted_at=None).first()

        if user is None:
            raise NotFoundException("Usuário não encontrado!")

        existing_user = User.objects.filter(
            ~Q(id=user_request.id)
            & (Q(name=dto.name) | Q(email=dto.email))
            & Q(deleted_at=None)
        ).first()

        if existing_user is not None:
            raise ConflictException("Usuário já cadastrado!")

        if dto.role_id is not None:
            user_role_validator(dto.role_id, user_request)

        user_password_validator(dto.password)

        if dto.name is not None:
            user.name = dto.name
        if dto.email is not None:
            user.email = dto.email
        if dto.password is not None:
            user.password = hash(dto.password)
        if dto.phone is not None:
            user.phone = dto.phone
        if dto.status is not None:
            user.status = dto.status
        if dto.role_id is not None:
            user.role = Role.objects.get(id=dto.role_id)

        user.save()

        return user
