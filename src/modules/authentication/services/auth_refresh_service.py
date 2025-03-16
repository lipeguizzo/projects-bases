import os
from src.modules.authentication.domain.dto.auth_refresh_dto import (
    AuthRefreshDTO,
)
from src.modules.user.models import User
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.services.token_verify_service import TokenVerifyService
from src.shared.validators.status_validator import status_validator
from src.shared.services.token_sign_service import TokenSignService
from src.shared.domain.enums.period_expiration_enum import PeriodExpiration


class AuthRefreshService:
    def execute(dto: AuthRefreshDTO):
        payload = TokenVerifyService.execute(
            token=dto.refresh_token, secret=os.getenv("JWT_REFRESH_SECRET", "")
        )

        user = User.objects.filter(email=payload["sub"], deleted_at=None).first()

        if user is None:
            raise NotFoundException("Usuário não encontrado!")

        status_validator(user.status)

        return {
            "user": user,
            "token": TokenSignService.execute(user=user, time=10),
            "refresh_token": TokenSignService.execute(
                user=user,
                time=10,
                period=PeriodExpiration.DAY,
                secret=os.getenv("JWT_REFRESH_SECRET", ""),
            ),
        }
