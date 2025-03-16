from src.shared.exceptions.bad_request_exception import BadRequestException
import re


def user_password_validator(password: str):

    password_matched = bool(
        re.fullmatch(
            r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$', password
        )
    )

    if password_matched is False:
        raise BadRequestException(
            "Password deve ter pelo menos 1 carácter maiúsculo, 1 carácter minúsculo, 1 um carácter numérico e um carácter especial!"
        )
