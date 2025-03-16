from django.db.models import Q
from src.shared.types.user_request import UserRequest
from src.modules.company.models import Company
from src.modules.company.domain.dto.company_update_dto import (
    CompanyUpdateDTO,
)
from src.shared.exceptions.conflict_exception import ConflictException
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_company_validator import (
    user_company_validator,
)


class CompanyUpdateService:
    @classmethod
    def execute(self, id: int, dto: CompanyUpdateDTO, user_request: UserRequest):

        company = Company.objects.filter(id=id, deleted_at=None).first()

        if company is None:
            raise NotFoundException("Empresa não encontrada!")

        existing_company = Company.objects.filter(
            ~Q(id=id) & (Q(name=dto.name) | Q(email=dto.email)) & Q(deleted_at=None)
        ).first()

        if existing_company is not None:
            raise ConflictException("Empresa já cadastrada!")

        user_company_validator(id, user_request)

        if dto.name is not None:
            company.name = dto.name
        if dto.trade_name is not None:
            company.trade_name = dto.trade_name
        if dto.email is not None:
            company.email = dto.email
        if dto.status is not None:
            company.status = dto.status

        if dto.address is not None:
            address = company.address
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

        company.save()

        return company
