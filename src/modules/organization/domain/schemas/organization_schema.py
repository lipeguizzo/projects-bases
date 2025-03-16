from ninja import ModelSchema
from src.modules.organization.models import Organization
from src.modules.address.domain.schemas.address_schema import AddressSchema
from src.modules.stored_file.domain.schemas.stored_file_schema import StoredFileSchema


class OrganizationSchema(ModelSchema):
    address: AddressSchema
    avatar: StoredFileSchema | None

    class Config:
        model = Organization
        model_fields = "__all__"
