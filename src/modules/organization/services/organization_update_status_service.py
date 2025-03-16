from src.shared.types.user_request import UserRequest
from src.modules.organization.models import Organization
from src.modules.organization.domain.dto.organization_update_status_dto import (
    OrganizationUpdateStatusDTO,
)
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_organization_validator import (
    user_organization_validator,
)


class OrganizationUpdateStatusService:
    @classmethod
    def execute(
        self, id: int, dto: OrganizationUpdateStatusDTO, user_request: UserRequest
    ):

        organization = Organization.objects.filter(id=id, deleted_at=None).first()

        if organization is None:
            raise NotFoundException("Organização não encontrada!")

        user_organization_validator(id, user_request)

        organization.status = dto.status

        organization.save()

        return organization
