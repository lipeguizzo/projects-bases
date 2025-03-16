import os
import jwt
from src.shared.exceptions.unauthorized_exception import UnauthorizedException


class TokenVerifyService:
    @classmethod
    def execute(
        self,
        token: str,
        secret: str = os.getenv("JWT_SECRET", ""),
    ):
        try:
            payload = jwt.decode(token, secret, algorithms=["HS256"])
            return payload
        except:
            raise UnauthorizedException("Token inválido!")
