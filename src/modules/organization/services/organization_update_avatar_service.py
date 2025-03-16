from ninja.files import UploadedFile
from src.shared.types.user_request import UserRequest
from src.modules.organization.models import Organization
from src.shared.exceptions.not_found_exception import NotFoundException
from src.shared.validators.user_organization_validator import (
    user_organization_validator,
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


class OrganizationUpdateAvatarService:
    @classmethod
    def execute(self, id: int, file: UploadedFile, user_request: UserRequest):

        organization = Organization.objects.filter(id=id, deleted_at=None).first()

        if organization is None:
            raise NotFoundException("Organização não encontrada!")

        user_organization_validator(id, user_request)

        if organization.avatar is None:
            stored_file = StoredFileCreateService.execute(
                generate_file_adapter_from_upload_file(file),
                {
                    "alt": file.name,
                    "name": file.name,
                    "relative_path": get_relative_path(
                        Folder.ORGANIZATIONS, organization.id
                    ),
                    "is_public": True,
                },
            )

            organization.avatar = stored_file
            organization.save()

        else:
            stored_file = StoredFileUpdateService.execute(
                organization.avatar.uuid,
                generate_file_adapter_from_upload_file(file),
                {
                    "alt": file.name,
                    "name": file.name,
                },
            )

            organization.avatar = stored_file
            organization.save()
        return organization
