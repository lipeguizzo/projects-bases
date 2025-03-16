from ninja import ModelSchema
from src.modules.stored_file.models import StoredFile


class StoredFileSchema(ModelSchema):
    class Config:
        model = StoredFile
        model_fields = "__all__"
