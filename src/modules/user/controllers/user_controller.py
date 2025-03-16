from ninja import Router, Query, File
from ninja.files import UploadedFile
from src.shared.decorators.require_abilities_decorator import require_abilities
from src.shared.decorators.ignore_abilities_decorator import ignore_abilities
from src.modules.role.domain.enums.ability_codes_enum import AbilityCodes
from src.modules.role.domain.enums.ability_actions_enum import AbilityActions
from src.shared.domain.dto.pagination_response_dto import PaginationResponseDTO
from src.shared.types.user_request import UserRequest
from src.modules.user.domain.schemas.user_schema import (
    UserSchema,
)
from src.modules.user.domain.dto.user_find_many_dto import (
    UserFindManyDTO,
)
from src.modules.user.services.user_find_many_service import (
    UserFindManyService,
)
from src.modules.user.services.user_find_one_service import (
    UserFindOneService,
)
from src.modules.user.domain.dto.user_create_dto import (
    UserCreateDTO,
)
from src.modules.user.services.user_create_service import (
    UserCreateService,
)
from src.modules.user.domain.dto.user_update_dto import (
    UserUpdateDTO,
)
from src.modules.user.services.user_update_service import (
    UserUpdateService,
)
from src.modules.user.domain.dto.user_update_status_dto import (
    UserUpdateStatusDTO,
)
from src.modules.user.services.user_update_status_service import (
    UserUpdateStatusService,
)
from src.modules.user.services.user_delete_service import (
    UserDeleteService,
)
from src.modules.user.services.user_update_avatar_service import (
    UserUpdateAvatarService,
)

from src.modules.user.services.user_delete_avatar_service import (
    UserDeleteAvatarService,
)
from src.modules.user.services.user_find_self_service import (
    UserFindSelfService,
)

from src.modules.user.services.user_update_self_service import (
    UserUpdateSelfService,
)
from src.modules.user.domain.dto.user_update_self_dto import UserUpdateSelfDTO

router = Router(tags=["Users"])


@router.get("", response=PaginationResponseDTO[UserSchema])
@require_abilities(AbilityCodes.USERS, AbilityActions.READ)
def find_all(request, dto: Query[UserFindManyDTO]):
    user_request: UserRequest = request.user
    return UserFindManyService.execute(dto.dict(), user_request)


@router.get("/self", response=UserSchema)
@ignore_abilities
def find_self(request):
    user_request: UserRequest = request.user
    return UserFindSelfService.execute(user_request)


@router.get("/{id}", response=UserSchema)
@require_abilities(AbilityCodes.USERS, AbilityActions.READ)
def find_one(request, id: int):
    user_request: UserRequest = request.user
    return UserFindOneService.execute(id, user_request)


@router.post("", response=UserSchema)
@require_abilities(AbilityCodes.USERS, AbilityActions.CREATE)
def create(request, dto: UserCreateDTO):
    user_request: UserRequest = request.user
    return UserCreateService.execute(dto, user_request)


@router.put("/self", response=UserSchema)
@ignore_abilities
def update_self(request, dto: UserUpdateSelfDTO):
    user_request: UserRequest = request.user
    return UserUpdateSelfService.execute(dto, user_request)


@router.put("/{id}", response=UserSchema)
@require_abilities(AbilityCodes.USERS, AbilityActions.UPDATE)
def update(request, id: int, dto: UserUpdateDTO):
    user_request: UserRequest = request.user
    return UserUpdateService.execute(id, dto, user_request)


@router.patch("/{id}/status", response=UserSchema)
@require_abilities(AbilityCodes.USERS, AbilityActions.UPDATE)
def update_status(request, id: int, dto: UserUpdateStatusDTO):
    user_request: UserRequest = request.user
    return UserUpdateStatusService.execute(id, dto, user_request)


@router.post("/{id}/avatar", response=UserSchema)
@require_abilities(AbilityCodes.USERS, AbilityActions.UPDATE)
def update_avatar(request, id: int, file: UploadedFile = File(...)):
    user_request: UserRequest = request.user
    return UserUpdateAvatarService.execute(id, file, user_request)


@router.delete("/{id}/avatar", response=UserSchema)
@require_abilities(AbilityCodes.USERS, AbilityActions.DELETE)
def delete_avatar(request, id: int):
    user_request: UserRequest = request.user
    return UserDeleteAvatarService.execute(id, user_request)


@router.delete("/{id}", response=UserSchema)
@require_abilities(AbilityCodes.USERS, AbilityActions.DELETE)
def delete(request, id: int):
    user_request: UserRequest = request.user
    return UserDeleteService.execute(id, user_request)
