from ninja import Schema
from typing import List
from src.modules.role.domain.enums.role_references_enum import RoleReferences
from src.shared.domain.enums.status_enum import Status


class RoleUpdateDTO(Schema):
    name: str | None = None
    is_default: bool | None = None
    reference: RoleReferences | None = None
    status: Status | None = None
    abilities_ids: List[int] | None = None
