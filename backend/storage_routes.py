from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException
)

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