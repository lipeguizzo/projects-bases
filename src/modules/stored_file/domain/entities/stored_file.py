import uuid
from django.db import models


class StoredFile(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    alt = models.CharField(max_length=255)
    original_name = models.CharField(max_length=255)
    stored_name = models.CharField(max_length=255)
    relative_path = models.CharField(max_length=255)
    content_type = models.CharField(max_length=100)
    is_public = models.BooleanField(default=False)
    checksum = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "stored_files"

    def __str__(self):
        return self.stored_name
