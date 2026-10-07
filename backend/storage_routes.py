from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException
)
from fastapi.responses import Response

from storage_manager import StorageManager


router = APIRouter()

storage_manager = StorageManager()


@router.post("/storage/upload")
async def upload_file(
    file: UploadFile = File(...),
    provider: str = Form(...)
):

    if provider not in [
        "AWS",
        "Azure",
        "Google Cloud"
    ]:

        raise HTTPException(
            status_code=400,
            detail="Invalid cloud provider"
        )

    file_content = await file.read()

    if not file_content:

        raise HTTPException(
            status_code=400,
            detail="File is empty"
        )

    result = storage_manager.upload_file(
        file.filename,
        file_content,
        provider
    )

    if not result.get("success"):

        raise HTTPException(
            status_code=500,
            detail=result.get(
                "message",
                "S3 upload failed"
            )
        )

    return {
        "message": "File uploaded successfully to AWS S3",
        "file": result
    }


@router.get("/storage/files")
def get_storage_files():

    return {
        "files": storage_manager.get_storage_files()
    }


@router.get("/storage/download")
def download_file(object_key: str):

    result = storage_manager.download_file(
        object_key
    )

    if not result.get("success"):

        raise HTTPException(
            status_code=404,
            detail=result.get(
                "message",
                "File not found"
            )
        )

    return Response(
        content=result["content"],
        media_type=result["content_type"],
        headers={
            "Content-Disposition":
                f'attachment; filename="{result["file_name"]}"'
        }
    )


@router.delete("/storage/delete")
def delete_file(object_key: str):

    result = storage_manager.delete_file(
        object_key
    )

    if not result.get("success"):

        raise HTTPException(
            status_code=500,
            detail=result.get(
                "message",
                "File deletion failed"
            )
        )

    return result