import os
import boto3
from django.core.files.base import ContentFile
from src.infra.file_system.adapters.file_adapter import FileAdapter


class AwsFileSystem:
    s3 = boto3.client("s3")
    bucket = os.getenv("AWS_S3_BUCKET_NAME", "")

    @classmethod
    def put(self, file: FileAdapter):
        key = f"{file['relative_path']}/{file['name']}"
        self.s3.upload_fileobj(
            Fileobj=ContentFile(file["content"]),
            Bucket=self.bucket,
            Key=key,
        )

    @classmethod
    def get(self, relative_path: str, file_name: str):
        key = f"{relative_path}/{file_name}"

        s3_object = self.s3.get_object(Bucket=self.bucket, Key=key)
        content = s3_object["Body"]
        content_type = s3_object.get("ContentType")
        content_length = s3_object.get("ContentLength")

        return {
            "name": file_name,
            "relative_path": relative_path,
            "content": content,
            "content_type": content_type,
            "length": content_length,
        }

    @classmethod
    def delete(self, key: str):
        self.s3.delete_object(Bucket=self.bucket, Key=key)
