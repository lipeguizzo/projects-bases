from ninja import Schema
from pydantic import Field
from src.modules.address.domain.dto.address_update_dto import AddressUpdateDTO
from src.shared.domain.enums.status_enum import Status


class OrganizationUpdateDTO(Schema):
    name: str | None = None
    trade_name: str | None = None
    email: str | None = Field(
        None,
        pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    )
    status: Status | None = None
    address: AddressUpdateDTO | None = None
