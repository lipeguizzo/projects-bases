from src.shared.domain.enums.status_enum import Status
from src.shared.exceptions.unauthorized_exception import UnauthorizedException


def status_validator(status: Status):
    if status == Status.BLOCKED:
        raise UnauthorizedException("Status bloqueado!")

    if status == Status.WAITING:
        raise UnauthorizedException("Status em espera!")

    if status == Status.DISABLED:
        raise UnauthorizedException("Status em desabilitado!")
