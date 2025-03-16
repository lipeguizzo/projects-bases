from ninja import ModelSchema
from src.modules.company.models import Company
from src.modules.organization.domain.schemas.organization_schema import (
    OrganizationSchema,
)
from src.modules.address.domain.schemas.address_schema import AddressSchema
from src.modules.stored_file.domain.schemas.stored_file_schema import StoredFileSchema


class CompanySchema(ModelSchema):
    organization: OrganizationSchema
    address: AddressSchema
    avatar: StoredFileSchema | None

    class Config:
        model = Company
        model_fields = "__all__"
