from src.shared.domain.dto.pagination_request_dto import PaginationRequestDTO
from src.shared.domain.enums.status_enum import Status
from typing import List


class CompanyFindManyDTO(PaginationRequestDTO):
    search: str | None = None
    name: str | None = None
    trade_name: str | None = None
    email: str | None = None
    organization_id: int | None = None
    status: List[Status] | None = None
    state: str | None = None
    city: str | None = None
    street: str | None = None
    neighborhood: str | None = None
    include_deleted: bool | None = False
