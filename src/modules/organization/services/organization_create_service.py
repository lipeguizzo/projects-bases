from django.db.models import Q
from src.modules.address.models import Address
from src.modules.organization.models import Organization
from src.modules.organization.domain.dto.organization_create_dto import (
    OrganizationCreateDTO,
)
from src.shared.exceptions.conflict_exception import ConflictException


class OrganizationCreateService:
    @classmethod
    def execute(self, dto: OrganizationCreateDTO):

        organization = Organization.objects.filter(
            (Q(name=dto.name) | Q(email=dto.email)) & Q(deleted_at=None)
        ).first()

        if organization is not None:
            raise ConflictException("Organização já cadastrada!")

        created_organization = Organization.objects.create(
            name=dto.name,
            trade_name=dto.trade_name,
            email=dto.email,
            status=dto.status,
            address=Address.objects.create(
                state=dto.address.state,
                city=dto.address.city,
                street=dto.address.street,
                neighborhood=dto.address.neighborhood,
                complement=dto.address.complement,
            ),
        )

        return created_organization
