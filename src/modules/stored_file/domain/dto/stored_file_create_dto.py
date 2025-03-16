from ninja import Schema


class StoredFileCreateDTO(Schema):
    name: str | None = None
    relative_path: str
    alt: str
    is_public: bool | None = True
