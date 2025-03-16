from ninja import Schema
from pydantic import Field
from src.modules.user.domain.enums.user_gender_enum import UserGender
from src.shared.domain.enums.status_enum import Status


class UserCreateDTO(Schema):
    name: str
    email: str = Field(
        ...,
        pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    )
    password: str
    gender: UserGender
    phone: str
    role_id: int
    organization_id: int | None = None
    company_id: int | None = None
    status: Status
