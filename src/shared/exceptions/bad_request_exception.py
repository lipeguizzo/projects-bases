class BadRequestException(Exception):
    def __init__(self, message: str):
        self.status = 400
        self.name = "Bad Request!"
        self.message = message
