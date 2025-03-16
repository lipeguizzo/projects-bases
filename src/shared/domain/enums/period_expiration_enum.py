from enum import Enum


class PeriodExpiration(str, Enum):
    MONTH = ("MONTH",)
    DAY = ("DAY",)
    HOUR = ("HOUR",)
    MINUTE = ("MINUTE",)
    SECOND = "SECOND"

    @classmethod
    def choices(cls):
        return [(tag, tag.value) for tag in cls]

    @classmethod
    def values(cls):
        return [tag.value for tag in cls]
