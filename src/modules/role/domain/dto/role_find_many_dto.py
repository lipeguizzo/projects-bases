from src.shared.domain.dto.pagination_request_dto import PaginationRequestDTO
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.shared.domain.enums.status_enum import Status
from typing import List


class RoleFindManyDTO(PaginationRequestDTO):
    search: str | None = None
    name: str | None = None
    is_default: bool | None = None
    reference: RoleReferences | None = None
    organization_id: int | None = None
    company_id: int | None = None
    status: List[Status] | None = None
    include_deleted: bool | None = False
