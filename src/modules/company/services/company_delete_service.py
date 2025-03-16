from django.utils import timezone
from src.shared.types.user_request import UserRequest
from src.modules.company.models import Company
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_company_validator import (
    user_company_validator,
)
from src.modules.company.validators.company_delete_validator import (
    company_delete_validator,
)
from src.modules.company.services.company_delete_avatar_service import (
    CompanyDeleteAvatarService,
)


class CompanyDeleteService:
    @classmethod
    def execute(self, id: int, user_request: UserRequest):

        company = Company.objects.filter(id=id, deleted_at=None).first()

        if company is None:
            raise NotFoundException("Empresa não encontrada!")

        user_company_validator(id, user_request)
        company_delete_validator(id)

        if company.avatar is not None:
            company = CompanyDeleteAvatarService.execute(id, user_request)

        company.deleted_at = timezone.now()
        company.save()

        return company
