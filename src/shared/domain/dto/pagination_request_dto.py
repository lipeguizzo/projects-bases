from ninja import Schema
from src.shared.types.sort import Sort


class PaginationRequestDTO(Schema):
    page: int = 1
    page_size: int = 10
    ordering: Sort | None = "asc"
    order_by: str | None = None
