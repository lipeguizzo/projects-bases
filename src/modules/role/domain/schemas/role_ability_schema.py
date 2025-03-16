from ninja import ModelSchema
from src.modules.role.models import RoleAbility


class RoleAbilitySchema(ModelSchema):
    class Config:
        model = RoleAbility
        model_fields = "__all__"
