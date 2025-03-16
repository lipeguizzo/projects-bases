from enum import Enum


class Status(str, Enum):
    ACTIVE = "ACTIVE"
    DISABLED = "DISABLED"
    BLOCKED = "BLOCKED"
    WAITING = "WAITING"

    @classmethod
    def choices(cls):
        return [(tag, tag.value) for tag in cls]

    @classmethod
    def values(cls):
        return [tag.value for tag in cls]
