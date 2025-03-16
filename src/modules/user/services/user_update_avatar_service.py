from django.db.models import Q
from ninja.files import UploadedFile
from src.shared.types.user_request import UserRequest
from src.modules.user.models import User
from src.shared.exceptions.not_found_exception import NotFoundException
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


class UserUpdateAvatarService:
    @classmethod
    def execute(self, id: int, file: UploadedFile, user_request: UserRequest):

        user = User.objects.filter(
            Q(id=id, deleted_at=None)
            & (
                Q(organization_id=user_request.organization_id)
                if user_request and user_request.organization_id
                else Q()
            )
            & (
                Q(company_id=user_request.company_id)
                if user_request and user_request.company_id
                else Q()
            )
        ).first()

        if user is None:
            raise NotFoundException("Usuário não encontrado!")

        if user.avatar is None:
            stored_file = StoredFileCreateService.execute(
                generate_file_adapter_from_upload_file(file),
                {
                    "alt": file.name,
                    "name": file.name,
                    "relative_path": get_relative_path(Folder.USERS, user.id),
                    "is_public": True,
                },
            )

            user.avatar = stored_file
            user.save()

        else:
            stored_file = StoredFileUpdateService.execute(
                user.avatar.uuid,
                generate_file_adapter_from_upload_file(file),
                {
                    "alt": file.name,
                    "name": file.name,
                },
            )

            user.avatar = stored_file
            user.save()
        return user
