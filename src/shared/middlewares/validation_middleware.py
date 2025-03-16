import json
from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse, HttpRequest, HttpResponse
from ninja.errors import ValidationError

VALIDATION_KEY = "IS_VALIDATION"


class ValidationMiddleware(MiddlewareMixin):
    def process_request(self, request: HttpRequest):
        request.META[VALIDATION_KEY] = "true"

    def process_response(self, request: HttpRequest, response: HttpResponse):
        try:

            if response.status_code == 422:
                content = json.loads(response.content)

                formatted_message = [
                    f"{error['loc'][-1].capitalize()} inválido(a)!"
                    for error in content["detail"]
                ]

                raise ValidationError(formatted_message)

            del request.META[VALIDATION_KEY]

            return response

        except ValidationError as e:
            return JsonResponse(
                {"status": 422, "name": "Argument Not Valid!", "details": e.errors},
                status=422,
            )
