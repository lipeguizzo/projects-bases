from django.utils.deprecation import MiddlewareMixin
from django.http import HttpRequest, HttpResponse, JsonResponse
from src.shared.services.token_verify_service import TokenVerifyService
from src.shared.exceptions.unauthorized_exception import UnauthorizedException
from src.modules.user.models import User
from src.shared.decorators.public_decorator import PUBLIC_KEY
from src.shared.middlewares.validation_middleware import VALIDATION_KEY


class AuthMiddleware(MiddlewareMixin):
    def process_request(self, request: HttpRequest):
        PUBLIC_PATHS = ["/admin", "/docs", "/openapi.json"]

        if any(request.path.startswith(path) for path in PUBLIC_PATHS):
            request.META[PUBLIC_KEY] = "true"

    def process_response(self, request: HttpRequest, response: HttpResponse):
        try:
            is_validation = VALIDATION_KEY in request.META
            if is_validation == True:
                return response

            is_public = PUBLIC_KEY in request.META
            if is_public == True:
                return response

            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            payload = TokenVerifyService.execute(token)
            user = User.objects.filter(email=payload["sub"], deleted_at=None).first()

            if user is None:
                raise UnauthorizedException("Usuário inválido!")

            request.user = user

            return response

        except UnauthorizedException as e:
            return JsonResponse(
                {"status": e.status, "name": e.name, "details": e.message},
                status=e.status,
            )
        except Exception as e:
            return JsonResponse(
                {"status": 500, "name": "Internal Server Error", "details": str(e)},
                status=500,
            )
