from datetime import datetime, timedelta
from ninja.files import UploadedFile
from src.infra.file_system.adapters.file_adapter import FileAdapter
from src.infra.file_system.enums.folder_enum import Folder


def generate_file_adapter_from_upload_file(
    file: UploadedFile,
) -> FileAdapter:
    return {
        "name": file.name,
        "relative_path": file.name,
        "content": file.read(),
        "content_type": file.content_type,
        "length": file.size,
    }


def generate_file_name(file_name: str) -> str:

    offset = timedelta(hours=-3)
    current_date = datetime.now() + offset

    day = current_date.strftime("%d")
    month = current_date.strftime("%m")
    year = current_date.year
    hours = current_date.strftime("%H")
    minutes = current_date.strftime("%M")
    seconds = current_date.strftime("%S")

    name = get_file_name(file_name)
    extension = get_file_extension(file_name)

    return f"{name}-{day}-{month}-{year}-{hours}-{minutes}-{seconds}{extension}"


def get_file_extension(file_name: str) -> str:
    extension = file_name[file_name.rfind(".") :]
    return extension


def get_file_name(file_name: str) -> str:
    name = ".".join(file_name.split(".")[:-1])
    return name


def get_relative_path(folder: Folder, id: int | str) -> str:
    relative_path = folder + "/" + str(id)
    return relative_path
