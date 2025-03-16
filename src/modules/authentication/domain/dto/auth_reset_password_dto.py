from ninja import Schema


class AuthResetPasswordDTO(Schema):
    password: str
    token: str
