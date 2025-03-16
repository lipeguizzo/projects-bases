from ninja import ModelSchema
from src.modules.role.models import Role
from src.modules.organization.domain.schemas.organization_schema import (
    OrganizationSchema,
)
from src.modules.company.domain.schemas.company_schema import CompanySchema


class RoleSchema(ModelSchema):
    organization: OrganizationSchema | None
    company: CompanySchema | None

    class Config:
        model = Role
        model_fields = "__all__"
