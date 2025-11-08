# backend/app/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL-encode special characters in password
# Original password: @Saibaba -> encoded as %40Saibaba
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:%40saibaba@localhost:3306/my_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
