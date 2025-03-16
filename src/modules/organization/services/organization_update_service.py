from django.db.models import Q
from src.shared.types.user_request import UserRequest
from src.modules.organization.models import Organization
from src.modules.organization.domain.dto.organization_update_dto import (
    OrganizationUpdateDTO,
)
from src.shared.exceptions.conflict_exception import ConflictException
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_organization_validator import (
    user_organization_validator,
)


class OrganizationUpdateService:
    @classmethod
    def execute(self, id: int, dto: OrganizationUpdateDTO, user_request: UserRequest):

        organization = Organization.objects.filter(id=id, deleted_at=None).first()

        if organization is None:
            raise NotFoundException("Organização não encontrada!")

        existing_organization = Organization.objects.filter(
            ~Q(id=id) & (Q(name=dto.name) | Q(email=dto.email)) & Q(deleted_at=None)
        ).first()

        if existing_organization is not None:
            raise ConflictException("Organização já cadastrada!")

        user_organization_validator(id, user_request)

        if dto.name is not None:
            organization.name = dto.name
        if dto.trade_name is not None:
            organization.trade_name = dto.trade_name
        if dto.email is not None:
            organization.email = dto.email
        if dto.status is not None:
            organization.status = dto.status

        if dto.address is not None:
            address = organization.address
            if dto.address.state is not None:
                address.state = dto.address.state
            if dto.address.city is not None:
                address.city = dto.address.city
            if dto.address.street is not None:
                address.street = dto.address.street
            if dto.address.neighborhood is not None:
                address.neighborhood = dto.address.neighborhood
            if dto.address.complement is not None:
                address.complement = dto.address.complement

            address.save()

        organization.save()

        return organization
