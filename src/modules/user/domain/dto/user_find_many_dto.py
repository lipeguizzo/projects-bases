from src.shared.domain.dto.pagination_request_dto import PaginationRequestDTO
from src.modules.user.domain.enums.user_gender_enum import UserGender
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.shared.domain.enums.status_enum import Status
from typing import List


class UserFindManyDTO(PaginationRequestDTO):
    search: str | None = None
    name: str | None = None
    email: str | None = None
    gender: UserGender | None = None
    role_reference: RoleReferences | None = None
    role_id: int | None = None
    organization_id: int | None = None
    company_id: int | None = None
    status: List[Status] | None = None
    include_deleted: bool | None = False
