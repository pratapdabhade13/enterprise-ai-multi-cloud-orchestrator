from fastapi import APIRouter
from cloud_manager import CloudManager
from aws_manager import AWSManager


router = APIRouter()

cloud_manager = CloudManager()
aws_manager = AWSManager()


# Get all supported cloud providers
@router.get("/providers")
def get_providers():

    return {
        "providers": cloud_manager.get_providers()
    }


# Get information about a specific provider
@router.get("/providers/{provider}")
def get_cloud_info(provider: str):

    return cloud_manager.get_cloud_info(provider)


# Test real AWS connection
@router.get("/aws/test")
def test_aws_connection():

    return aws_manager.test_connection()


# Get real AWS S3 buckets
@router.get("/aws/s3/buckets")
def get_aws_s3_buckets():

    return aws_manager.get_s3_buckets()