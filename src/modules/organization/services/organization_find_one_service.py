from src.modules.organization.models import Organization
from src.shared.types.user_request import UserRequest
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_organization_validator import (
    user_organization_validator,
)


class OrganizationFindOneService:
    @classmethod
    def execute(self, id: int, user_request: UserRequest):

        organization = Organization.objects.filter(id=id, deleted_at=None).first()

        if organization is None:
            raise NotFoundException("Organização não encontrada!")

        user_organization_validator(id, user_request)

        return organization
