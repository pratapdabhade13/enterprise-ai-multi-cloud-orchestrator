import boto3
from botocore.exceptions import ClientError


class StorageManager:

    def __init__(self):

        self.bucket_name = "pratap-multi-cloud-orchestrator-2026"
        self.region = "ap-southeast-2"

        self.s3 = boto3.client(
            "s3",
            region_name=self.region
        )

    def upload_file(
        self,
        file_name,
        file_content,
        provider
    ):

        try:

            safe_file_name = file_name.replace(
                "\\",
                "/"
            ).split("/")[-1]

            object_name = (
                f"{provider.lower().replace(' ', '-')}/"
                f"{safe_file_name}"
            )

            self.s3.put_object(
                Bucket=self.bucket_name,
                Key=object_name,
                Body=file_content
            )

            return {
                "success": True,
                "file_name": safe_file_name,
                "provider": provider,
                "bucket": self.bucket_name,
                "object_key": object_name,
                "status": "Uploaded to AWS S3"
            }

        except Exception as error:

            return {
                "success": False,
                "message": "AWS S3 upload failed",
                "error": str(error)
            }

    def get_storage_files(self):

        try:

            response = self.s3.list_objects_v2(
                Bucket=self.bucket_name
            )

            files = []

            for obj in response.get("Contents", []):

                files.append({
                    "file_name": obj["Key"],
                    "size": obj["Size"],
                    "status": "Available in AWS S3",
                    "last_modified": str(
                        obj["LastModified"]
                    )
                })

            return files

        except ClientError as error:

            return [
                {
                    "error": str(error)
                }
            ]

        except Exception as error:

            return [
                {
                    "error": str(error)
                }
            ]

    def download_file(self, object_key):

        try:

            response = self.s3.get_object(
                Bucket=self.bucket_name,
                Key=object_key
            )

            return {
                "success": True,
                "content": response["Body"].read(),
                "content_type": response.get(
                    "ContentType",
                    "application/octet-stream"
                ),
                "file_name": object_key.split("/")[-1]
            }

        except Exception as error:

            return {
                "success": False,
                "message": "AWS S3 download failed",
                "error": str(error)
            }

    def delete_file(self, object_key):

        try:

            self.s3.delete_object(
                Bucket=self.bucket_name,
                Key=object_key
            )

            return {
                "success": True,
                "object_key": object_key,
                "message": "File deleted from AWS S3 successfully"
            }

        except Exception as error:

            return {
                "success": False,
                "message": "AWS S3 delete failed",
                "error": str(error)
            }