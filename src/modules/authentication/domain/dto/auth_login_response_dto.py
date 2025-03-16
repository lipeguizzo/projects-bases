from ninja import Schema
from src.modules.user.domain.schemas.user_schema import UserSchema


class AuthLoginResponseDTO(Schema):
    user: UserSchema
    token: str
    refresh_token: str
