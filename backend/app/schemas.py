# schemas.py (example)
from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str  # "consumer" or "responder"

class ResponderLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    registered: Optional[bool] = True
    class Config:
        orm_mode = True

class MedicalHistoryCreate(BaseModel):
    blood_group: str
    conditions: List[str]
    allergies: List[str]
    medications: List[str]

class MedicalHistoryResponse(MedicalHistoryCreate):
    id: int
    user_id: int
    class Config:
        orm_mode = True
