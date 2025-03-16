from ninja import Router, Query
from typing import List
from src.shared.decorators.require_abilities_decorator import require_abilities
from src.shared.decorators.ignore_abilities_decorator import ignore_abilities
from src.modules.role.domain.enums.ability_codes_enum import AbilityCodes
from src.modules.role.domain.enums.ability_actions_enum import AbilityActions
from src.shared.domain.dto.pagination_response_dto import PaginationResponseDTO
from src.shared.types.user_request import UserRequest
from src.modules.role.domain.schemas.role_schema import (
    RoleSchema,
)
from src.modules.role.domain.schemas.ability_schema import AbilitySchema
from src.modules.role.domain.dto.role_find_many_dto import (
    RoleFindManyDTO,
)
from src.modules.role.services.role_find_many_service import (
    RoleFindManyService,
)
from src.modules.role.services.role_find_one_service import (
    RoleFindOneService,
)
from src.modules.role.domain.dto.role_create_dto import (
    RoleCreateDTO,
)
from src.modules.role.services.role_create_service import (
    RoleCreateService,
)
from src.modules.role.domain.dto.role_update_dto import (
    RoleUpdateDTO,
)
from src.modules.role.services.role_update_service import (
    RoleUpdateService,
)
from src.modules.role.domain.dto.role_update_status_dto import (
    RoleUpdateStatusDTO,
)
from src.modules.role.services.role_update_status_service import (
    RoleUpdateStatusService,
)
from src.modules.role.services.role_delete_service import (
    RoleDeleteService,
)
from src.modules.role.services.role_find_all_abilities_service import (
    RoleFindAllAbilitiesService,
)
from src.modules.role.services.role_find_abilities_service import (
    RoleFindAbilitiesService,
)


router = Router(tags=["Roles"])


@router.get("", response=PaginationResponseDTO[RoleSchema])
@require_abilities(AbilityCodes.ROLES, AbilityActions.READ)
def find_all(request, dto: Query[RoleFindManyDTO]):
    user_request: UserRequest = request.user
    return RoleFindManyService.execute(dto.dict(), user_request)


@router.get("/all-abilities", response=list[AbilitySchema])
@ignore_abilities
def find_all_abilities(request):
    return RoleFindAllAbilitiesService.execute()


@router.get("/{id}", response=RoleSchema)
@require_abilities(AbilityCodes.ROLES, AbilityActions.READ)
def find_one(request, id: int):
    user_request: UserRequest = request.user
    return RoleFindOneService.execute(id, user_request)


@router.get("/{id}/abilities", response=list[AbilitySchema])
@ignore_abilities
def find_abilities(request, id: int):
    user_request: UserRequest = request.user
    return RoleFindAbilitiesService.execute(id, user_request)


@router.post("", response=RoleSchema)
@require_abilities(AbilityCodes.ROLES, AbilityActions.CREATE)
def create(request, dto: RoleCreateDTO):
    user_request: UserRequest = request.user
    return RoleCreateService.execute(dto, user_request)


@router.put("/{id}", response=RoleSchema)
@require_abilities(AbilityCodes.ROLES, AbilityActions.UPDATE)
def update(request, id: int, dto: RoleUpdateDTO):
    user_request: UserRequest = request.user
    return RoleUpdateService.execute(id, dto, user_request)


@router.patch("/{id}/status", response=RoleSchema)
@require_abilities(AbilityCodes.ROLES, AbilityActions.UPDATE)
def update_status(request, id: int, dto: RoleUpdateStatusDTO):
    user_request: UserRequest = request.user
    return RoleUpdateStatusService.execute(id, dto, user_request)


@router.delete("/{id}", response=RoleSchema)
@require_abilities(AbilityCodes.ROLES, AbilityActions.DELETE)
def delete(request, id: int):
    user_request: UserRequest = request.user
    return RoleDeleteService.execute(id, user_request)
