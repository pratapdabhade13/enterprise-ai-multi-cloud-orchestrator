from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from cloud_routes import router as cloud_router
from resource_routes import router as resource_router
from storage_routes import router as storage_router


app = FastAPI(
    title="Enterprise AI Multi-Cloud Orchestrator",
    description="AI-powered multi-cloud management platform",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://enterprise-ai-multi-cloud-orchestra.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    cloud_router,
    prefix="/api/cloud"
)

app.include_router(
    resource_router,
    prefix="/api"
)

app.include_router(
    storage_router,
    prefix="/api"
)


@app.get("/")
def home():
    return {
        "message": "Enterprise AI Multi-Cloud Orchestrator API is running",
        "status": "success"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }