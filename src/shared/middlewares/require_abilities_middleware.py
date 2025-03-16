from django.utils.deprecation import MiddlewareMixin
from django.http import HttpRequest, HttpResponse, JsonResponse
from src.shared.services.token_verify_service import TokenVerifyService
from src.shared.exceptions.unauthorized_exception import UnauthorizedException
from src.modules.user.models import User
from src.modules.role.models import RoleAbility
from src.shared.decorators.public_decorator import PUBLIC_KEY
from src.shared.decorators.require_abilities_decorator import ABILITIES_KEY
from src.shared.decorators.ignore_abilities_decorator import IGNORE_ABILITIES_KEY
from src.shared.middlewares.validation_middleware import VALIDATION_KEY


class RequireAbilitiesMiddleware(MiddlewareMixin):
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

            ignore_abilities = IGNORE_ABILITIES_KEY in request.META
            if ignore_abilities == True:
                return response

            abilities = request.META.get(ABILITIES_KEY, None)
            if abilities is None:
                raise UnauthorizedException("Usuário sem habilidades necessárias!")

            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            payload = TokenVerifyService.execute(token)
            user = User.objects.filter(email=payload["sub"], deleted_at=None).first()

            if user is None:
                raise UnauthorizedException("Usuário inválido!")

            hasAbility = RoleAbility.objects.filter(
                role__id=user.role.id,
                ability__code=abilities["code"],
                ability__action=abilities["action"],
            ).first()

            if hasAbility is None:
                raise UnauthorizedException("Usuário sem habilidades necessárias!")

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
