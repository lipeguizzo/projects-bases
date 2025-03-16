from ninja import Schema
from src.shared.domain.enums.status_enum import Status


class CompanyUpdateStatusDTO(Schema):
    status: Status
