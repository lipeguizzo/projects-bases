import os
import datetime
import jwt
from src.modules.user.models import User
from src.shared.domain.enums.period_expiration_enum import PeriodExpiration


class TokenSignService:
    @classmethod
    def execute(
        self,
        user: User,
        time: int = 10,
        period: PeriodExpiration = PeriodExpiration.MINUTE,
        secret: str = os.getenv("JWT_SECRET", ""),
    ):

        payload = {"sub": user.email, "exp": self.getExpirationDate(time, period)}
        token = jwt.encode(payload, secret, algorithm="HS256")

        return token

    def getExpirationDate(time: int, period: PeriodExpiration):
        now = datetime.datetime.now()

        if period == PeriodExpiration.SECOND:
            return now + datetime.timedelta(seconds=time)
        if period == PeriodExpiration.MINUTE:
            return now + datetime.timedelta(minutes=time)
        if period == PeriodExpiration.DAY:
            return now + datetime.timedelta(days=time)
        if period == PeriodExpiration.HOUR:
            return now + datetime.timedelta(hours=time)

        return now + datetime.timedelta(minutes=time)
