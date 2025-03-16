from ninja import ModelSchema
from src.modules.address.models import Address


class AddressSchema(ModelSchema):
    class Config:
        model = Address
        model_fields = "__all__"
