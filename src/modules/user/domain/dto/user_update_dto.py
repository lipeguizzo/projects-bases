from ninja import Schema
from pydantic import Field
from src.modules.user.domain.enums.user_gender_enum import UserGender
from src.shared.domain.enums.status_enum import Status


class UserUpdateDTO(Schema):
    name: str | None = None
    email: str | None = Field(
        None,
        pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    )
    password: str
    gender: UserGender | None = None
    phone: str | None = None
    role_id: int | None = None
    status: Status | None = None
