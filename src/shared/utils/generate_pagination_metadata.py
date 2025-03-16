from math import ceil
from typing import Dict, Optional
from src.shared.types.query_params_value import QueryParamsValue
from src.shared.domain.interfaces.pagination_metadata_interface import (
    IPaginationMetadata,
)


def generate_pagination_meta_links(
    base_url: str,
    current_page: int,
    total_items: int,
    page_size: int,
    query_params: Optional[Dict[str, QueryParamsValue]] = None,
) -> Dict[str, Optional[str]]:
    total_pages = ceil(total_items / page_size)

    def get_query_string(params: Dict[str, QueryParamsValue]) -> str:
        query_parts = []
        for key, value in params.items():
            if value is not None:
                if isinstance(value, list):
                    query_parts.extend(f"{key}={item}" for item in value)
                else:
                    query_parts.append(f"{key}={value}")
        return "&".join(query_parts)

    def get_link(page: int) -> Optional[str]:
        if page < 1 or page > total_pages:
            return None
        params = {"page": str(page), "page_size": str(page_size)}
        if query_params:
            params.update({k: v for k, v in query_params.items() if v is not None})
        query_string = get_query_string(params)
        return f"{base_url}?{query_string}"

    return {
        "first": get_link(1),
        "prev": get_link(current_page - 1),
        "next": get_link(current_page + 1),
        "last": get_link(total_pages),
    }


def generate_pagination_meta(
    base_url: str,
    total_items: int,
    current_page: int,
    page_size: int,
    query_params: Optional[Dict[str, QueryParamsValue]] = None,
) -> IPaginationMetadata:
    total_pages = ceil(total_items / page_size)

    links = generate_pagination_meta_links(
        base_url, current_page, total_items, page_size, query_params
    )

    return {
        "page": current_page,
        "page_size": page_size,
        "total_items": total_items,
        "total_pages": total_pages,
        "links": links,
    }
