from ninja import Router
from django.http import StreamingHttpResponse
from src.shared.decorators.public_decorator import public
from src.modules.stored_file.services.stored_file_download_service import (
    StoredFileDownloadService,
)

router = Router(tags=["Files"])


@router.get("/{uuid}", auth=None)
@public
def download(request, uuid: str):
    file = StoredFileDownloadService.execute(uuid)

    response = StreamingHttpResponse(file["content"], content_type=file["content_type"])
    response["Content-Disposition"] = f'attachment; filename="{file["name"]}"'
    response["Content-Length"] = file["length"]

    return response


@router.get("/public/{uuid}", auth=None)
@public
def download_public(request, uuid: str):
    file = StoredFileDownloadService.execute(uuid, True)

    response = StreamingHttpResponse(file["content"], content_type=file["content_type"])
    response["Content-Disposition"] = f'attachment; filename="{file["name"]}"'
    response["Content-Length"] = file["length"]

    return response
