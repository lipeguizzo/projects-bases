from src.modules.company.models import Company
from src.shared.types.user_request import UserRequest
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_company_validator import (
    user_company_validator,
)


class CompanyFindOneService:
    @classmethod
    def execute(self, id: int, user_request: UserRequest):

        company = Company.objects.filter(id=id, deleted_at=None).first()

        if company is None:
            raise NotFoundException("Empresa não encontrada!")

        user_company_validator(id, user_request)

        return company
