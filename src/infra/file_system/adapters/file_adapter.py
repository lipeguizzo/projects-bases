from typing import TypedDict


class FileAdapter(TypedDict):
    name: str
    relative_path: str
    content: bytes
    length: int
    content_type: str
