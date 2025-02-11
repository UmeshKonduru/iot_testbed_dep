from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./iot_testbed.db"
    REDIS_URL: str = "redis://localhost"
    API_PREFIX: str = "/api/v1"
    
    class Config:
        env_file = ".env"

settings = Settings()