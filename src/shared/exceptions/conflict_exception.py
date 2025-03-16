class ConflictException(Exception):
    def __init__(self, message: str):
        self.status = 409
        self.name = "Conflict!"
        self.message = message
