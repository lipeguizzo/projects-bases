from ninja import Schema


class PaginationMetadataLinksSchema(Schema):
    first: str | None
    prev: str | None
    next: str | None
    last: str | None
