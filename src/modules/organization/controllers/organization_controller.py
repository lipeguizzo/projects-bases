from ninja import Router, Query, File
from ninja.files import UploadedFile
from src.shared.decorators.require_abilities_decorator import require_abilities
from src.modules.role.domain.enums.ability_codes_enum import AbilityCodes
from src.modules.role.domain.enums.ability_actions_enum import AbilityActions
from src.shared.domain.dto.pagination_response_dto import PaginationResponseDTO
from src.shared.types.user_request import UserRequest
from src.modules.organization.domain.schemas.organization_schema import (
    OrganizationSchema,
)
from src.modules.organization.domain.dto.organization_find_many_dto import (
    OrganizationFindManyDTO,
)
from src.modules.organization.services.organization_find_many_service import (
    OrganizationFindManyService,
)
from src.modules.organization.services.organization_find_one_service import (
    OrganizationFindOneService,
)
from src.modules.organization.domain.dto.organization_create_dto import (
    OrganizationCreateDTO,
)
from src.modules.organization.services.organization_create_service import (
    OrganizationCreateService,
)
from src.modules.organization.domain.dto.organization_update_dto import (
    OrganizationUpdateDTO,
)
from src.modules.organization.services.organization_update_service import (
    OrganizationUpdateService,
)
from src.modules.organization.domain.dto.organization_update_status_dto import (
    OrganizationUpdateStatusDTO,
)
from src.modules.organization.services.organization_update_status_service import (
    OrganizationUpdateStatusService,
)
from src.modules.organization.services.organization_delete_service import (
    OrganizationDeleteService,
)
from src.modules.organization.services.organization_update_avatar_service import (
    OrganizationUpdateAvatarService,
)

from src.modules.organization.services.organization_delete_avatar_service import (
    OrganizationDeleteAvatarService,
)

router = Router(tags=["Organizations"])


@router.get("", response=PaginationResponseDTO[OrganizationSchema])
@require_abilities(AbilityCodes.ORGANIZATIONS, AbilityActions.READ)
def find_all(request, dto: Query[OrganizationFindManyDTO]):
    user_request: UserRequest = request.user
    return OrganizationFindManyService.execute(dto.dict(), user_request)


@router.get("/{id}", response=OrganizationSchema)
@require_abilities(AbilityCodes.ORGANIZATIONS, AbilityActions.READ)
def find_one(request, id: int):
    user_request: UserRequest = request.user
    return OrganizationFindOneService.execute(id, user_request)


@router.post("", response=OrganizationSchema)
@require_abilities(AbilityCodes.ORGANIZATIONS, AbilityActions.CREATE)
def create(request, dto: OrganizationCreateDTO):
    return OrganizationCreateService.execute(dto)


@router.put("/{id}", response=OrganizationSchema)
@require_abilities(AbilityCodes.ORGANIZATIONS, AbilityActions.UPDATE)
def update(request, id: int, dto: OrganizationUpdateDTO):
    user_request: UserRequest = request.user
    return OrganizationUpdateService.execute(id, dto, user_request)


@router.patch("/{id}/status", response=OrganizationSchema)
@require_abilities(AbilityCodes.ORGANIZATIONS, AbilityActions.UPDATE)
def update_status(request, id: int, dto: OrganizationUpdateStatusDTO):
    user_request: UserRequest = request.user
    return OrganizationUpdateStatusService.execute(id, dto, user_request)


@router.post("/{id}/avatar", response=OrganizationSchema)
@require_abilities(AbilityCodes.ORGANIZATIONS, AbilityActions.UPDATE)
def update_avatar(request, id: int, file: UploadedFile = File(...)):
    user_request: UserRequest = request.user
    return OrganizationUpdateAvatarService.execute(id, file, user_request)


@router.delete("/{id}/avatar", response=OrganizationSchema)
@require_abilities(AbilityCodes.ORGANIZATIONS, AbilityActions.DELETE)
def delete_avatar(request, id: int):
    user_request: UserRequest = request.user
    return OrganizationDeleteAvatarService.execute(id, user_request)


@router.delete("/{id}", response=OrganizationSchema)
@require_abilities(AbilityCodes.ORGANIZATIONS, AbilityActions.DELETE)
def delete(request, id: int):
    user_request: UserRequest = request.user
    return OrganizationDeleteService.execute(id, user_request)
