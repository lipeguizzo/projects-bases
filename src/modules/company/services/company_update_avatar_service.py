from ninja.files import UploadedFile
from src.shared.types.user_request import UserRequest
from src.modules.company.models import Company
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_company_validator import (
    user_company_validator,
)
from src.modules.stored_file.services.stored_file_create_service import (
    StoredFileCreateService,
)
from src.modules.stored_file.services.stored_file_update_service import (
    StoredFileUpdateService,
)
from src.shared.utils.file import (
    generate_file_adapter_from_upload_file,
    get_relative_path,
)
from src.infra.file_system.enums.folder_enum import Folder


class CompanyUpdateAvatarService:
    @classmethod
    def execute(self, id: int, file: UploadedFile, user_request: UserRequest):

        company = Company.objects.filter(id=id, deleted_at=None).first()

        if company is None:
            raise NotFoundException("Empresa não encontrada!")

        user_company_validator(id, user_request)

        if company.avatar is None:
            stored_file = StoredFileCreateService.execute(
                generate_file_adapter_from_upload_file(file),
                {
                    "alt": file.name,
                    "name": file.name,
                    "relative_path": get_relative_path(Folder.COMPANIES, company.id),
                    "is_public": True,
                },
            )

            company.avatar = stored_file
            company.save()

        else:
            stored_file = StoredFileUpdateService.execute(
                company.avatar.uuid,
                generate_file_adapter_from_upload_file(file),
                {
                    "alt": file.name,
                    "name": file.name,
                },
            )

            company.avatar = stored_file
            company.save()
        return company
