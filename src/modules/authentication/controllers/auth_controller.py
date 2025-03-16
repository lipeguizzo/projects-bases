from ninja import Router
from src.modules.authentication.domain.dto.auth_login_dto import AuthLoginDTO
from src.modules.authentication.domain.dto.auth_login_response_dto import (
    AuthLoginResponseDTO,
)
from src.modules.authentication.services.auth_login_service import AuthLoginService
from src.modules.authentication.domain.dto.auth_refresh_dto import AuthRefreshDTO
from src.modules.authentication.domain.dto.auth_refresh_response_dto import (
    AuthRefreshResponseDTO,
)
from src.modules.authentication.services.auth_refresh_service import AuthRefreshService
from src.modules.authentication.domain.dto.auth_recover_password_dto import (
    AuthRecoverPasswordDTO,
)
from src.modules.authentication.domain.dto.auth_recover_password_response_dto import (
    AuthRecoverPasswordResponseDTO,
)
from src.modules.authentication.services.auth_recover_password_service import (
    AuthRecoverPasswordService,
)
from src.modules.authentication.services.auth_reset_password_service import (
    AuthResetPasswordService,
)
from src.modules.authentication.domain.dto.auth_reset_password_dto import (
    AuthResetPasswordDTO,
)
from src.modules.user.domain.schemas.user_schema import UserSchema
from src.modules.authentication.services.auth_register_service import (
    AuthRegisterService,
)
from src.modules.authentication.domain.dto.auth_register_dto import (
    AuthRegisterDTO,
)
from src.shared.decorators.public_decorator import public

router = Router(tags=["Auth"])


@router.post("/login", response=AuthLoginResponseDTO, auth=None)
@public
def login(request, dto: AuthLoginDTO):
    return AuthLoginService.execute(dto)


@router.post("/refresh", response=AuthRefreshResponseDTO, auth=None)
@public
def refresh(request, dto: AuthRefreshDTO):
    return AuthRefreshService.execute(dto)


@router.post("/register", response=UserSchema, auth=None)
@public
def register(request, dto: AuthRegisterDTO):
    return AuthRegisterService.execute(dto)


@router.post(
    "/recover-password",
    response=AuthRecoverPasswordResponseDTO,
    auth=None,
)
@public
def recover_password(request, dto: AuthRecoverPasswordDTO):
    return AuthRecoverPasswordService.execute(dto)


@router.patch("/reset-password", response=UserSchema, auth=None)
@public
def reset_password(request, dto: AuthResetPasswordDTO):
    return AuthResetPasswordService.execute(dto)
