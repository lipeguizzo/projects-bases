from django.db.models import Q
from src.shared.types.user_request import UserRequest
from src.modules.address.models import Address
from src.modules.organization.models import Organization
from src.modules.company.models import Company
from src.modules.company.domain.dto.company_create_dto import (
    CompanyCreateDTO,
)
from src.shared.exceptions.conflict_exception import ConflictException
from src.shared.validators.user_organization_validator import (
    user_organization_validator,
)


class CompanyCreateService:
    @classmethod
    def execute(self, dto: CompanyCreateDTO, user_request: UserRequest):

        company = Company.objects.filter(
            (Q(name=dto.name) | Q(email=dto.email)) & Q(deleted_at=None)
        ).first()

        if company is not None:
            raise ConflictException("Empresa já cadastrada!")

        user_organization_validator(dto.organization_id, user_request)

        created_company = Company.objects.create(
            name=dto.name,
            trade_name=dto.trade_name,
            email=dto.email,
            status=dto.status,
            organization=Organization.objects.get(id=dto.organization_id),
            address=Address.objects.create(
                state=dto.address.state,
                city=dto.address.city,
                street=dto.address.street,
                neighborhood=dto.address.neighborhood,
                complement=dto.address.complement,
            ),
        )

        return created_company
