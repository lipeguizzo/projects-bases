from ninja.security import HttpBearer
from django.http import HttpRequest
from src.shared.services.token_verify_service import TokenVerifyService
from src.shared.exceptions.unauthorized_exception import UnauthorizedException
from src.modules.user.models import User


class AuthGuard(HttpBearer):
    def authenticate(self, request: HttpRequest, token: str):
        payload = TokenVerifyService.execute(token)
        user = User.objects.filter(email=payload["sub"], deleted_at=None).first()

        if user is None:
            raise UnauthorizedException("Usuário inválido!")

        request.user = user

        return True
