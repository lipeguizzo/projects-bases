from ninja import Schema
from typing import Generic, TypeVar, List
from src.shared.domain.schemas.pagination_metadata_schema import (
    PaginationMetadataSchema,
)

T = TypeVar("T")


class PaginationResponseDTO(Schema, Generic[T]):
    data: List[T]
    meta: PaginationMetadataSchema
