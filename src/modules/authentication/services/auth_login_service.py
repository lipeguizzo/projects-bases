import os
from src.modules.authentication.domain.dto.auth_login_dto import AuthLoginDTO
from src.modules.user.models import User
from src.shared.exceptions.unauthorized_exception import UnauthorizedException
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.utils.hash import check
from src.modules.user.validators.user_password_validator import user_password_validator
from src.shared.validators.status_validator import status_validator
from src.shared.services.token_sign_service import TokenSignService
from src.shared.domain.enums.period_expiration_enum import PeriodExpiration


class AuthLoginService:
    def execute(dto: AuthLoginDTO):
        user = User.objects.filter(email=dto.email, deleted_at=None).first()

        if user is None:
            raise NotFoundException("E-mail incorreto!")

        status_validator(user.status)

        user_password_validator(dto.password)

        if not check(dto.password, user.password):
            raise UnauthorizedException("Senha incorreta!")

        return {
            "user": user,
            "token": TokenSignService.execute(user=user),
            "refresh_token": TokenSignService.execute(
                user=user,
                time=10,
                period=PeriodExpiration.DAY,
                secret=os.getenv("JWT_REFRESH_SECRET", ""),
            ),
        }
