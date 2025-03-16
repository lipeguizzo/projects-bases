from django.utils import timezone
from src.shared.types.user_request import UserRequest
from src.modules.organization.models import Organization
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_organization_validator import (
    user_organization_validator,
)
from src.modules.organization.validators.organization_delete_validator import (
    organization_delete_validator,
)
from src.modules.organization.services.organization_delete_avatar_service import (
    OrganizationDeleteAvatarService,
)


class OrganizationDeleteService:
    @classmethod
    def execute(self, id: int, user_request: UserRequest):

        organization = Organization.objects.filter(id=id, deleted_at=None).first()

        if organization is None:
            raise NotFoundException("Organização não encontrada!")

        user_organization_validator(id, user_request)
        organization_delete_validator(id)

        if organization.avatar is not None:
            organization = OrganizationDeleteAvatarService.execute(id, user_request)

        organization.deleted_at = timezone.now()
        organization.save()

        return organization
