from typing import TypedDict


class IPaginationMetadataLinks(TypedDict):
    first: str | None
    prev: str | None
    next: str | None
    last: str | None
