from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./iot_testbed.db"
    REDIS_URL: str = "redis://localhost"
    API_PREFIX: str = "/api/v1"
    JWT_SECRET_KEY: str = "secret"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    UPLOAD_DIR: str = "../uploads"
    
    class Config:
        env_file = ".env"

settings = Settings()