from ninja import Schema


class StoredFileUpdateDTO(Schema):
    name: str | None = None
    relative_path: str | None = None
    alt: str | None = None
    is_public: bool | None = None
