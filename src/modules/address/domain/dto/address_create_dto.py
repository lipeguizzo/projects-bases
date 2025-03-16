from ninja import Schema


class AddressCreateDTO(Schema):
    state: str
    city: str
    street: str
    neighborhood: str
    complement: str
