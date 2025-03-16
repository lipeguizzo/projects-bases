from enum import Enum


class RoleReferences(str, Enum):
    ADMIN = "ADMIN"
    ADMIN_ORGANIZATION = "ADMIN_ORGANIZATION"
    ADMIN_COMPANY = "ADMIN_COMPANY"
    CLIENT = "CLIENT"

    @classmethod
    def choices(cls):
        return [(tag, tag.value) for tag in cls]

    @classmethod
    def values(cls):
        return [tag.value for tag in cls]
