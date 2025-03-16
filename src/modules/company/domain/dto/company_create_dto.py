from ninja import Schema
from pydantic import Field
from src.modules.address.domain.dto.address_create_dto import AddressCreateDTO
from src.shared.domain.enums.status_enum import Status


class CompanyCreateDTO(Schema):
    name: str
    trade_name: str
    email: str = Field(
        ...,
        pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    )
    organization_id: int
    status: Status
    address: AddressCreateDTO
