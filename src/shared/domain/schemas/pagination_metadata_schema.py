from ninja import Schema
from src.shared.domain.schemas.pagination_metadata_links_schema import (
    PaginationMetadataLinksSchema,
)


class PaginationMetadataSchema(Schema):
    page: int = 1
    page_size: int = 10
    total_items: int | None = None
    total_pages: int | None = None
    links: PaginationMetadataLinksSchema | None = None
