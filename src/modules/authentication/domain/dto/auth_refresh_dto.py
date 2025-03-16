from ninja import Schema


class AuthRefreshDTO(Schema):
    refresh_token: str
