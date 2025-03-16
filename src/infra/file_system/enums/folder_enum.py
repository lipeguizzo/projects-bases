from enum import Enum


class Folder(str, Enum):
    USERS = ("users",)
    COMPANIES = ("companies",)
    ORGANIZATIONS = ("organizations",)

    @classmethod
    def choices(cls):
        return [(tag, tag.value) for tag in cls]

    @classmethod
    def values(cls):
        return [tag.value for tag in cls]
