from src.shared.types.user_request import UserRequest
from src.modules.organization.models import Organization
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_organization_validator import (
    user_organization_validator,
)
from src.modules.stored_file.services.stored_file_delete_service import (
    StoredFileDeleteService,
)


class OrganizationDeleteAvatarService:
    @classmethod
    def execute(self, id: int, user_request: UserRequest):

        organization = Organization.objects.filter(id=id, deleted_at=None).first()

        if organization is None:
            raise NotFoundException("Organização não encontrada!")

        if organization.avatar is None:
            raise NotFoundException("Arquivo não encontrado!")

        user_organization_validator(id, user_request)

        uuid = organization.avatar.uuid

        organization.avatar = None
        organization.save()

        StoredFileDeleteService.execute(uuid)

        return organization
