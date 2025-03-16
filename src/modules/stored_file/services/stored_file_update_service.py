from src.infra.file_system.implementations.aws_file_system import AwsFileSystem
from src.infra.file_system.adapters.file_adapter import FileAdapter
from src.modules.stored_file.models import StoredFile
from src.modules.stored_file.domain.dto.stored_file_update_dto import (
    StoredFileUpdateDTO,
)
from src.shared.utils.file import generate_file_name
from src.shared.utils.hash import hash_md5
from src.shared.exceptions.not_found_exception import NotFoundException


class StoredFileUpdateService:
    @classmethod
    def execute(self, uuid: str, file: FileAdapter, dto: StoredFileUpdateDTO):
        stored_file = StoredFile.objects.filter(uuid=uuid).first()

        if stored_file is None:
            raise NotFoundException("Arquivo não encontrado!")

        stored_name = generate_file_name(dto["name"] if "name" in dto else file["name"])

        relative_path = (
            dto["relative_path"]
            if "relative_path" in dto
            else stored_file.relative_path
        )

        AwsFileSystem.delete(f"{stored_file.relative_path}/{stored_file.stored_name}")

        AwsFileSystem.put(
            {
                "name": stored_name,
                "relative_path": relative_path,
                "content": file["content"],
                "length": file["length"],
                "content_type": file["content_type"],
            }
        )

        updated_file = StoredFile.objects.filter(uuid=uuid).first()

        updated_file.alt = dto["alt"]
        updated_file.checksum = hash_md5(file["content"])
        updated_file.original_name = file["name"]
        updated_file.stored_name = stored_name
        updated_file.relative_path = relative_path
        updated_file.content_type = file["content_type"]
        updated_file.is_public = (
            dto["is_public"] if "is_public" in dto else stored_file.is_public
        )

        updated_file.save()

        return updated_file
