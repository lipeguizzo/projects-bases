from django.http import JsonResponse
from ninja.errors import ValidationError
from src.shared.exceptions.bad_request_exception import BadRequestException
from src.shared.exceptions.conflict_exception import ConflictException
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.exceptions.unauthorized_exception import UnauthorizedException


def exception_handler(request, exc):

    if isinstance(exc, BadRequestException):
        return JsonResponse(
            {"status": exc.status, "name": exc.name, "details": exc.message},
            status=exc.status,
        )

    if isinstance(exc, UnauthorizedException):
        return JsonResponse(
            {"status": exc.status, "name": exc.name, "details": exc.message},
            status=exc.status,
        )

    if isinstance(exc, NotFoundException):
        return JsonResponse(
            {"status": exc.status, "name": exc.name, "details": exc.message},
            status=exc.status,
        )

    if isinstance(exc, ConflictException):
        return JsonResponse(
            {"status": exc.status, "name": exc.name, "details": exc.message},
            status=exc.status,
        )

    if isinstance(exc, ValidationError):
        return JsonResponse(
            {"status": 422, "name": "Argument Not Valid!", "details": exc.errors},
            status=422,
        )

    return JsonResponse(
        {"status": 500, "name": "Internal Server Error", "details": str(exc)},
        status=500,
    )
