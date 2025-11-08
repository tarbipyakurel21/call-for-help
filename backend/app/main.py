# backend/app/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import List
from pydantic import BaseModel
from io import BytesIO
from fastapi.responses import StreamingResponse
import os
from openai import OpenAI
import qrcode
from fastapi.middleware.cors import CORSMiddleware


from .database import SessionLocal, engine, Base
from . import models, schemas

# -------------------- OpenAI Client --------------------
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# -------------------- FastAPI App --------------------
app = FastAPI(title="Health App Backend")

origins=["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # allowed origins
    allow_credentials=True,
    allow_methods=["*"],            # allow all methods (GET, POST, etc.)
    allow_headers=["*"],            # allow all headers
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -------------------- Database --------------------
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------- User Routes --------------------
@app.post("/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role,
        registered=False if user.role == "responder" else True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Create empty medical history for consumers
    if user.role == "consumer":
        med_history = models.MedicalHistory(
            user_id=db_user.id,
            blood_group="",
            conditions=[],
            allergies=[],
            medications=[]
        )
        db.add(med_history)
        db.commit()

    return db_user

@app.post("/responder/login", response_model=schemas.UserResponse)
def responder_login(credentials: schemas.ResponderLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        models.User.email == credentials.email,
        models.User.role == "responder"
    ).first()
    if not user or not pwd_context.verify(credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not user.registered:
        raise HTTPException(status_code=403, detail="Responder not verified")
    return user

# -------------------- Medical History Routes --------------------
@app.post("/medical-history", response_model=schemas.MedicalHistoryResponse)
def add_or_update_medical_history(user_id: int, history: schemas.MedicalHistoryCreate, db: Session = Depends(get_db)):
    db_history = db.query(models.MedicalHistory).filter(models.MedicalHistory.user_id == user_id).first()
    if not db_history:
        raise HTTPException(status_code=404, detail="Medical history not found")
    
    db_history.blood_group = history.blood_group
    db_history.conditions = history.conditions
    db_history.allergies = history.allergies
    db_history.medications = history.medications

    db.commit()
    db.refresh(db_history)
    return db_history

@app.get("/consumer/{consumer_id}/medical-history", response_model=schemas.MedicalHistoryResponse)
def get_consumer_medical_history(consumer_id: int, responder_id: int, db: Session = Depends(get_db)):
    responder = db.query(models.User).filter(
        models.User.id == responder_id,
        models.User.role == "responder",
        models.User.registered == True
    ).first()
    if not responder:
        raise HTTPException(status_code=403, detail="Unauthorized responder")

    consumer = db.query(models.User).filter(
        models.User.id == consumer_id,
        models.User.role == "consumer"
    ).first()
    if not consumer:
        raise HTTPException(status_code=404, detail="Consumer not found")
    
    med_history = db.query(models.MedicalHistory).filter(models.MedicalHistory.user_id == consumer.id).first()
    if not med_history:
        raise HTTPException(status_code=404, detail="Medical history not found")
    
    return med_history

# -------------------- Health Chatbot Endpoint --------------------
class HealthChatRequest(BaseModel):
    message: str

class HealthChatResponse(BaseModel):
    reply: str

@app.post("/health-chat", response_model=HealthChatResponse)
def health_chat(request: HealthChatRequest):
    """
    Receives a symptom or health question from a consumer and returns guidance.
    """
    try:
        prompt = f"""
        You are a professional health assistant chatbot.
        Provide helpful, safe, general guidance for this user message:
        "{request.message}"
        Suggest home remedies, lifestyle advice, or whether to see a doctor.
        Do NOT give a diagnosis or prescribe medication.
        """

        # Use the OpenAI client
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful medical assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=250,
            temperature=0.7
        )

        reply = response.choices[0].message.content.strip()
        return {"reply": reply}

    except Exception as e:
        return {"reply": f"Error: {str(e)}"}

# -------------------- Optional: List All Users --------------------
@app.get("/users", response_model=List[schemas.UserResponse])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


@app.get("/qrcode")
def get_qr_code(user_id: int, name: str):
    """
    Generates a QR code for the given user_id and name and returns it as a PNG.
    Example: /qrcode?user_id=1&name=Tarbi
    """
    # Create QR code
    data = f"{user_id}:{name}"
    img = qrcode.make(data)
    
    # Save image to in-memory bytes
    buf = BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    
    # Return as streaming response
    return StreamingResponse(buf, media_type="image/png")