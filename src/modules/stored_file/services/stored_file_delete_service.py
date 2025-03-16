from src.infra.file_system.implementations.aws_file_system import AwsFileSystem
from src.modules.stored_file.models import StoredFile
from src.shared.exceptions.not_found_exception import NotFoundException


class StoredFileDeleteService:
    @classmethod
    def execute(self, uuid: str):
        stored_file = StoredFile.objects.filter(uuid=uuid).first()

        if stored_file is None:
            raise NotFoundException("Arquivo não encontrado!")

        AwsFileSystem.delete(f"{stored_file.relative_path}/{stored_file.stored_name}")

        stored_file.delete()
