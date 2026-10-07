import boto3
from botocore.exceptions import BotoCoreError, ClientError


class AWSManager:

    def __init__(self):
        self.connected = False
        self.error = None

        self.bucket_name = "pratap-multi-cloud-orchestrator-2026"
        self.region = "ap-southeast-2"

    def test_connection(self):

        try:
            sts = boto3.client(
                "sts",
                region_name=self.region
            )

            identity = sts.get_caller_identity()

            self.connected = True
            self.error = None

            return {
                "connected": True,
                "account_id": identity.get("Account"),
                "user_id": identity.get("UserId"),
                "arn": identity.get("Arn")
            }

        except Exception as error:

            self.connected = False
            self.error = str(error)

            return {
                "connected": False,
                "message": "AWS connection failed",
                "error": str(error)
            }

    def get_s3_buckets(self):

        try:

            s3 = boto3.client(
                "s3",
                region_name=self.region
            )

            # Check access to our specific bucket
            s3.head_bucket(
                Bucket=self.bucket_name
            )

            return {
                "success": True,
                "buckets": [
                    {
                        "name": self.bucket_name,
                        "region": self.region
                    }
                ]
            }

        except Exception as error:

            return {
                "success": False,
                "message": "Unable to access AWS S3 bucket",
                "error": str(error)
            }

    def upload_file(self, file_path, object_name):

        try:

            s3 = boto3.client(
                "s3",
                region_name=self.region
            )

            s3.upload_file(
                file_path,
                self.bucket_name,
                object_name
            )

            return {
                "success": True,
                "bucket": self.bucket_name,
                "object": object_name,
                "message": "File uploaded to AWS S3 successfully"
            }

        except Exception as error:

            return {
                "success": False,
                "message": "S3 upload failed",
                "error": str(error)
            }