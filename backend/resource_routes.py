from fastapi import APIRouter, HTTPException
from resource_manager import ResourceManager

router = APIRouter()

resource_manager = ResourceManager()


@router.get("/resources")
def get_all_resources():
    return {
        "resources": resource_manager.get_all_resources()
    }


@router.get("/resources/{provider}")
def get_provider_resources(provider: str):
    resources = resource_manager.get_resources(provider)

    if not resources:
        raise HTTPException(
            status_code=404,
            detail="Cloud provider not found"
        )

    for resource in resources:
        resource["provider"] = provider

    return {
        "provider": provider,
        "resources": resources
    }


@router.get("/resource/{resource_id}")
def get_resource_details(resource_id: str):
    resource = resource_manager.get_resource_by_id(resource_id)

    if resource is None:
        raise HTTPException(
            status_code=404,
            detail="Resource not found"
        )

    return {
        "resource": resource
    }