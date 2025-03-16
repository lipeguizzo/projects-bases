from src.shared.types.user_request import UserRequest
from src.modules.company.models import Company
from src.modules.company.domain.dto.company_update_status_dto import (
    CompanyUpdateStatusDTO,
)
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_company_validator import (
    user_company_validator,
)


class CompanyUpdateStatusService:
    @classmethod
    def execute(self, id: int, dto: CompanyUpdateStatusDTO, user_request: UserRequest):

        company = Company.objects.filter(id=id, deleted_at=None).first()

        if company is None:
            raise NotFoundException("Empresa não encontrada!")

        user_company_validator(id, user_request)

        company.status = dto.status

        company.save()

        return company
