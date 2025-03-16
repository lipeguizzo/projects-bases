from typing import TypedDict
from src.shared.domain.interfaces.pagination_metadata_links_interface import (
    IPaginationMetadataLinks,
)


class IPaginationMetadata(TypedDict):
    page: int
    page_size: int
    total_items: int
    total_pages: int
    links: IPaginationMetadataLinks
