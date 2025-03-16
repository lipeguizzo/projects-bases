from ninja import Router, Query, File
from ninja.files import UploadedFile
from src.shared.decorators.require_abilities_decorator import require_abilities
from src.modules.role.domain.enums.ability_codes_enum import AbilityCodes
from src.modules.role.domain.enums.ability_actions_enum import AbilityActions
from src.shared.domain.dto.pagination_response_dto import PaginationResponseDTO
from src.shared.types.user_request import UserRequest
from src.modules.company.domain.schemas.company_schema import (
    CompanySchema,
)
from src.modules.company.domain.dto.company_find_many_dto import (
    CompanyFindManyDTO,
)
from src.modules.company.services.company_find_many_service import (
    CompanyFindManyService,
)
from src.modules.company.services.company_find_one_service import (
    CompanyFindOneService,
)
from src.modules.company.domain.dto.company_create_dto import (
    CompanyCreateDTO,
)
from src.modules.company.services.company_create_service import (
    CompanyCreateService,
)
from src.modules.company.domain.dto.company_update_dto import (
    CompanyUpdateDTO,
)
from src.modules.company.services.company_update_service import (
    CompanyUpdateService,
)
from src.modules.company.domain.dto.company_update_status_dto import (
    CompanyUpdateStatusDTO,
)
from src.modules.company.services.company_update_status_service import (
    CompanyUpdateStatusService,
)
from src.modules.company.services.company_delete_service import (
    CompanyDeleteService,
)
from src.modules.company.services.company_update_avatar_service import (
    CompanyUpdateAvatarService,
)

from src.modules.company.services.company_delete_avatar_service import (
    CompanyDeleteAvatarService,
)

router = Router(tags=["Companies"])


@router.get("", response=PaginationResponseDTO[CompanySchema])
@require_abilities(AbilityCodes.COMPANIES, AbilityActions.READ)
def find_all(request, dto: Query[CompanyFindManyDTO]):
    user_request: UserRequest = request.user
    return CompanyFindManyService.execute(dto.dict(), user_request)


@router.get("/{id}", response=CompanySchema)
@require_abilities(AbilityCodes.COMPANIES, AbilityActions.READ)
def find_one(request, id: int):
    user_request: UserRequest = request.user
    return CompanyFindOneService.execute(id, user_request)


@router.post("", response=CompanySchema)
@require_abilities(AbilityCodes.COMPANIES, AbilityActions.CREATE)
def create(request, dto: CompanyCreateDTO):
    user_request: UserRequest = request.user
    return CompanyCreateService.execute(dto, user_request)


@router.put("/{id}", response=CompanySchema)
@require_abilities(AbilityCodes.COMPANIES, AbilityActions.UPDATE)
def update(request, id: int, dto: CompanyUpdateDTO):
    user_request: UserRequest = request.user
    return CompanyUpdateService.execute(id, dto, user_request)


@router.patch("/{id}/status", response=CompanySchema)
@require_abilities(AbilityCodes.COMPANIES, AbilityActions.UPDATE)
def update_status(request, id: int, dto: CompanyUpdateStatusDTO):
    user_request: UserRequest = request.user
    return CompanyUpdateStatusService.execute(id, dto, user_request)


@router.post("/{id}/avatar", response=CompanySchema)
@require_abilities(AbilityCodes.COMPANIES, AbilityActions.UPDATE)
def update_avatar(request, id: int, file: UploadedFile = File(...)):
    user_request: UserRequest = request.user
    return CompanyUpdateAvatarService.execute(id, file, user_request)


@router.delete("/{id}/avatar", response=CompanySchema)
@require_abilities(AbilityCodes.COMPANIES, AbilityActions.DELETE)
def delete_avatar(request, id: int):
    user_request: UserRequest = request.user
    return CompanyDeleteAvatarService.execute(id, user_request)


@router.delete("/{id}", response=CompanySchema)
@require_abilities(AbilityCodes.COMPANIES, AbilityActions.DELETE)
def delete(request, id: int):
    user_request: UserRequest = request.user
    return CompanyDeleteService.execute(id, user_request)
