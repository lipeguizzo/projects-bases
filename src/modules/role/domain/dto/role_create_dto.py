from ninja import Schema
from typing import List
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.shared.domain.enums.status_enum import Status


class RoleCreateDTO(Schema):
    name: str
    is_default: bool
    reference: RoleReferences
    organization_id: int | None = None
    company_id: int | None = None
    status: Status
    abilities_ids: List[int] | None = None
