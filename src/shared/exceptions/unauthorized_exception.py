class UnauthorizedException(Exception):
    def __init__(self, message: str):
        self.status = 401
        self.name = "Unauthorized!"
        self.message = message
