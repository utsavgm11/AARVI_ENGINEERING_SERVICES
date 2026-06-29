import os
import uuid
import shutil
from enum import Enum
from typing import List, Optional
from datetime import datetime, timedelta
import jwt
import bcrypt
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, EmailStr
from sqlalchemy import create_engine, Column, String, DateTime, Text, func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("CRITICAL ERROR: DATABASE_URL is completely missing from your .env file.")

# Secure Fallbacks for Cryptographic Tokens
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "AARVI_ENGINEERING_SUPER_SECRET_COMPLIANCE_KEY_2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8-Hour Operational Shift Window

# ─── DATABASE SETUPS ────────────────────────────────────────────────────────
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ─── STRICT SECURITY ACCOUNT ENUMS ──────────────────────────────────────────
class UserRole(str, Enum):
    IT_MANAGER = "IT_MANAGER"
    IT_EXECUTIVE = "IT_EXECUTIVE"
    ADMIN = "ADMIN"

# ─── DATABASE STRUCTURAL MODELS ─────────────────────────────────────────────
class DBUser(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default=UserRole.ADMIN.value, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class DBProject(Base):
    __tablename__ = "projects"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    client = Column(String, default="Confidential")
    location = Column(String, nullable=False)
    duration = Column(String, nullable=False)
    scope_of_work = Column(Text, nullable=False)
    impacts = Column(ARRAY(String), nullable=False)
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class DBBlog(Base):
    __tablename__ = "blogs"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    content = Column(Text, nullable=False)
    excerpt = Column(String, nullable=False)
    author = Column(String, default="Aarvi Engineering Specialist")
    cover_img = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# Automated verification execution to spin up infrastructure schemas safely
Base.metadata.create_all(bind=engine)

# ─── SYSTEM SCHEMAS (DATA VALIDATION PORTS) ──────────────────────────────────
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: str

class LoginRequest(BaseModel):
    username: str
    password: str

class UserCreateSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: UserRole = UserRole.ADMIN

class UserUpdateSchema(BaseModel):
    email: Optional[EmailStr] = None
    role: Optional[UserRole] = None
    password: Optional[str] = None

class UserResponseSchema(BaseModel):
    id: str
    username: str
    email: str
    role: str
    created_at: datetime
    class Config:
        from_attributes = True

class ProjectCreateSchema(BaseModel):
    title: str
    category: str
    client: Optional[str] = "Confidential"
    location: str
    duration: str
    scope_of_work: str
    impacts: List[str]
    image_url: Optional[str] = None

class ProjectResponseSchema(ProjectCreateSchema):
    id: str
    created_at: datetime
    class Config:
        from_attributes = True

class BlogCreateSchema(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str
    author: Optional[str] = "Aarvi Engineering Specialist"
    cover_img: Optional[str] = None

class BlogResponseSchema(BlogCreateSchema):
    id: str
    created_at: datetime
    class Config:
        from_attributes = True

# ─── FastAPI ENGINE HOOKS ───────────────────────────────────────────────────
app = FastAPI(title="Aarvi Corporate Ecosystem Architecture API", version="2.0.0")

# Create the uploads folder automatically if it doesn't exist
os.makedirs("uploads", exist_ok=True)

# Mount the folder so images can be accessed via URL
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ─── ACCESS CONTROL & JWT UTILITY GUARDS ─────────────────────────────────────
def get_current_user_identity(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db_session)) -> DBUser:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate identity payload authorization signatures.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
        
    user = db.query(DBUser).filter(func.lower(DBUser.username) == func.lower(username.strip())).first()
    if user is None:
        raise credentials_exception
    return user

def require_role_clearance(allowed_roles: List[UserRole]):
    def dependency(current_user: DBUser = Depends(get_current_user_identity)):
        if current_user.role not in [role.value for role in allowed_roles]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Security Guard Error: Privileges inadequate for execution."
            )
        return current_user
    return dependency

# ─── 1. CORE AUTHENTICATION ROUTES ──────────────────────────────────────────
@app.post("/api/auth/login", response_model=TokenResponse)
def authenticate_user(payload: LoginRequest, db: Session = Depends(get_db_session)):
    # Clean input and query case-insensitively using SQLAlchemy func.lower
    cleaned_username = payload.username.strip()
    user = db.query(DBUser).filter(func.lower(DBUser.username) == func.lower(cleaned_username)).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid system account credentials.")
    
    # Secure binary password cross-check alignment
    provided_password = payload.password.encode('utf-8')
    stored_hash = user.hashed_password.encode('utf-8') if isinstance(user.hashed_password, str) else user.hashed_password
    
    if not bcrypt.checkpw(provided_password, stored_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid system account credentials.")
    
    token_expiry = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data = {"sub": user.username, "exp": token_expiry, "role": user.role}
    encoded_jwt = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    
    return {"access_token": encoded_jwt, "token_type": "bearer", "role": user.role}

# ─── 2. IT MANAGER ONLY: ROLE MANAGEMENT PORTS ────────────────────────────────
@app.post("/api/admin/users", response_model=UserResponseSchema, status_code=status.HTTP_201_CREATED)
def it_manager_create_user(payload: UserCreateSchema, db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER]))):
    collision_check = db.query(DBUser).filter((func.lower(DBUser.username) == func.lower(payload.username.strip())) | (func.lower(DBUser.email) == func.lower(payload.email.strip()))).first()
    if collision_check:
        raise HTTPException(status_code=400, detail="Username identity or email registry already allocated.")
    
    hashed = bcrypt.hashpw(payload.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = DBUser(username=payload.username.strip(), email=payload.email.strip(), hashed_password=hashed, role=payload.role.value)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.put("/api/admin/users/{user_id}", response_model=UserResponseSchema)
def it_manager_modify_user(user_id: str, payload: UserUpdateSchema, db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER]))):
    target_user = db.query(DBUser).filter(DBUser.id == user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="Target user registry path missing.")
    
    if payload.email: target_user.email = payload.email.strip()
    if payload.role: target_user.role = payload.role.value
    if payload.password:
        target_user.hashed_password = bcrypt.hashpw(payload.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
    db.commit()
    db.refresh(target_user)
    return target_user

# ─── 3. PROJECTS LOG INTERFACE (RBAC FOR CONTENT CREATION) ────────────────────
@app.get("/api/projects", response_model=List[ProjectResponseSchema])
def get_all_projects_public(db: Session = Depends(get_db_session)):
    return db.query(DBProject).order_by(DBProject.created_at.desc()).all()

@app.post("/api/projects", response_model=ProjectResponseSchema, status_code=status.HTTP_201_CREATED)
def write_new_project(payload: ProjectCreateSchema, db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER, UserRole.ADMIN]))):
    new_record = DBProject(**payload.model_dump())
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

@app.put("/api/projects/{project_id}", response_model=ProjectResponseSchema)
def edit_existing_project(project_id: str, payload: ProjectCreateSchema, db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER, UserRole.ADMIN]))):
    record = db.query(DBProject).filter(DBProject.id == project_id).first()
    if not record: raise HTTPException(status_code=404, detail="Project entry not found in repository.")
    for key, val in payload.model_dump().items():
        setattr(record, key, val)
    db.commit()
    db.refresh(record)
    return record

@app.delete("/api/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_record(project_id: str, db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER, UserRole.ADMIN]))):
    record = db.query(DBProject).filter(DBProject.id == project_id).first()
    if not record: raise HTTPException(status_code=404, detail="Project configuration entry missing.")
    db.delete(record)
    db.commit()
    return {"detail": "Project wiped clean from infrastructure database."}

# ─── 4. CORPORATE PUBLICATIONS MANAGEMENT (RBAC FOR BLOGS) ───────────────────
@app.get("/api/blogs", response_model=List[BlogResponseSchema])
def get_all_blogs_public(db: Session = Depends(get_db_session)):
    return db.query(DBBlog).order_by(DBBlog.created_at.desc()).all()

@app.post("/api/blogs", response_model=BlogResponseSchema, status_code=status.HTTP_201_CREATED)
def write_new_blog_post(payload: BlogCreateSchema, db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER, UserRole.ADMIN]))):
    if db.query(DBBlog).filter(DBBlog.slug == payload.slug).first():
        raise HTTPException(status_code=400, detail="The slug directory structure is already allocated.")
    new_post = DBBlog(**payload.model_dump())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@app.put("/api/blogs/{blog_id}", response_model=BlogResponseSchema)
def edit_existing_blog(blog_id: str, payload: BlogCreateSchema, db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER, UserRole.ADMIN]))):
    post = db.query(DBBlog).filter(DBBlog.id == blog_id).first()
    if not post: raise HTTPException(status_code=404, detail="Target document path missing.")
    for key, val in payload.model_dump().items():
        setattr(post, key, val)
    db.commit()
    db.refresh(post)
    return post

@app.delete("/api/blogs/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_blog_post(blog_id: str, db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER, UserRole.ADMIN]))):
    post = db.query(DBBlog).filter(DBBlog.id == blog_id).first()
    if not post: raise HTTPException(status_code=404, detail="Target document reference missing.")
    db.delete(post)
    db.commit()
    return {"detail": "Publication document completely expunged."}

# ─── 5. MEDIA UPLOAD ENGINE ─────────────────────────────────────────────────
@app.post("/api/upload")
def upload_media_file(
    file: UploadFile = File(...), 
    _=Depends(require_role_clearance([UserRole.IT_MANAGER, UserRole.IT_EXECUTIVE, UserRole.ADMIN]))
):
    """Saves uploaded media securely to the local server and returns the access URL."""
    try:
        file_extension = file.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_location = f"uploads/{unique_filename}"
        
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return {"url": f"/uploads/{unique_filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File processing failure: {str(e)}")