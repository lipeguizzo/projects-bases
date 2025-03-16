from ninja import Schema


class AddressUpdateDTO(Schema):
    state: str | None = None
    city: str | None = None
    street: str | None = None
    neighborhood: str | None = None
    complement: str | None = None
