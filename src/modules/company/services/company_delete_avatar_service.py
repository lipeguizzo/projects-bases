from src.shared.types.user_request import UserRequest
from src.modules.company.models import Company
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_company_validator import (
    user_company_validator,
)
from src.modules.stored_file.services.stored_file_delete_service import (
    StoredFileDeleteService,
)


class CompanyDeleteAvatarService:
    @classmethod
    def execute(self, id: int, user_request: UserRequest):

        company = Company.objects.filter(id=id, deleted_at=None).first()

        if company is None:
            raise NotFoundException("Empresa não encontrada!")

        if company.avatar is None:
            raise NotFoundException("Arquivo não encontrado!")

        user_company_validator(id, user_request)

        uuid = company.avatar.uuid

        company.avatar = None
        company.save()

        StoredFileDeleteService.execute(uuid)

        return company
