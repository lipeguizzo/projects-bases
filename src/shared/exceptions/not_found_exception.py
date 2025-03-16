class NotFoundException(Exception):
    def __init__(self, message: str):
        self.status = 404
        self.name = "NotFound!"
        self.message = message
