from src.modules.authentication.domain.dto.auth_reset_password_dto import (
    AuthResetPasswordDTO,
)
from src.modules.user.models import User
from src.modules.user.validators.user_password_validator import user_password_validator
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.services.token_verify_service import TokenVerifyService
from src.shared.utils.hash import hash


class AuthResetPasswordService:
    def execute(dto: AuthResetPasswordDTO):
        payload = TokenVerifyService.execute(token=dto.token)

        user = User.objects.filter(email=payload["sub"], deleted_at=None).first()

        if user is None:
            raise NotFoundException("Token inválido!")

        user_password_validator(dto.password)

        user.password = hash(dto.password)
        user.save()

        return user
