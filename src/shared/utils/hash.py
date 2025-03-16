import bcrypt
import hashlib


def hash(value: str):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(value.encode("utf-8"), salt).decode("utf-8")


def check(value: str, hashed: str):
    return bcrypt.checkpw(value.encode("utf-8"), hashed.encode("utf-8"))


def hash_md5(value: str):
    return hashlib.md5(value).hexdigest()
