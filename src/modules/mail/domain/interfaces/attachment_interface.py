from typing import TypedDict


class IAttachment(TypedDict):
    filename: str
    path: str | None
    contentType: str | None
    cid: str | None
    href: str | None
