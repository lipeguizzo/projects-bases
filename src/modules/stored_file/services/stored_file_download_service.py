from django.db.models import Q
from src.infra.file_system.implementations.aws_file_system import AwsFileSystem
from src.modules.stored_file.models import StoredFile
from src.shared.exceptions.not_found_exception import NotFoundException


class StoredFileDownloadService:
    @classmethod
    def execute(self, uuid: str, is_public: bool | None = None):

        if is_public is not None:
            stored_file = StoredFile.objects.filter(
                uuid=uuid, is_public=is_public
            ).first()
        else:
            stored_file = StoredFile.objects.filter(uuid=uuid).first()

        if stored_file is None:
            raise NotFoundException("Arquivo não encontrado!")

        file = AwsFileSystem.get(stored_file.relative_path, stored_file.stored_name)

        return {
            "name": file["name"],
            "relative_path": stored_file.relative_path,
            "content": file["content"],
            "content_type": stored_file.content_type,
            "length": file["length"],
        }
