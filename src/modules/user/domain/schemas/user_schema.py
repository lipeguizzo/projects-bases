from ninja import ModelSchema
from src.modules.user.models import User
from src.modules.role.domain.schemas.role_schema import RoleSchema
from src.modules.organization.domain.schemas.organization_schema import (
    OrganizationSchema,
)
from src.modules.company.domain.schemas.company_schema import CompanySchema
from src.modules.stored_file.domain.schemas.stored_file_schema import StoredFileSchema


class UserSchema(ModelSchema):
    role: RoleSchema
    organization: OrganizationSchema | None
    company: CompanySchema | None
    avatar: StoredFileSchema | None

    class Config:
        model = User
        model_fields = "__all__"
