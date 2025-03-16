from ninja import Schema
from pydantic import Field
from src.modules.user.domain.enums.user_gender_enum import UserGender
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.modules.address.domain.dto.address_create_dto import AddressCreateDTO


class AuthRegisterDTO(Schema):
    name: str
    email: str = Field(
        ...,
        pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    )
    password: str
    gender: UserGender
    phone: str
    reference: RoleReferences
    organization_name: str | None
    organization_trade_name: str | None
    organization_email: str | None = Field(
        ...,
        pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    )
    address: AddressCreateDTO | None
