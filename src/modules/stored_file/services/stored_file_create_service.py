from typing import Dict
from src.infra.file_system.implementations.aws_file_system import AwsFileSystem
from src.infra.file_system.adapters.file_adapter import FileAdapter
from src.modules.stored_file.models import StoredFile
from src.modules.stored_file.domain.dto.stored_file_create_dto import (
    StoredFileCreateDTO,
)
from src.shared.utils.file import generate_file_name
from src.shared.utils.hash import hash_md5


class StoredFileCreateService:
    @classmethod
    def execute(self, file: FileAdapter, dto: StoredFileCreateDTO):
        stored_name = generate_file_name(dto["name"] if "name" in dto else file["name"])

        AwsFileSystem.put(
            {
                "name": stored_name,
                "relative_path": dto["relative_path"],
                "content": file["content"],
                "length": file["length"],
                "content_type": file["content_type"],
            }
        )

        created_file = StoredFile.objects.create(
            alt=dto["alt"],
            checksum=hash_md5(file["content"]),
            original_name=file["name"],
            stored_name=stored_name,
            relative_path=dto["relative_path"],
            content_type=file["content_type"],
            is_public=dto["is_public"],
        )

        return created_file
