# backend/app/models.py
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
from sqlalchemy.types import JSON

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(200), nullable=False)  # hashed password
    role = Column(String(50), nullable=False)  # "consumer" or "responder"
    registered = Column(Boolean, default=False)  # only for responders

    medical_history = relationship("MedicalHistory", back_populates="user", uselist=False)


class MedicalHistory(Base):
    __tablename__ = "medical_histories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    blood_group = Column(String(10))
    conditions = Column(JSON)  # list of conditions
    allergies = Column(JSON, nullable=True)
    medications = Column(JSON, nullable=True)

    user = relationship("User", back_populates="medical_history")
