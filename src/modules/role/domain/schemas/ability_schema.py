from ninja import ModelSchema
from src.modules.role.models import Ability


class AbilitySchema(ModelSchema):
    class Config:
        model = Ability
        model_fields = "__all__"
