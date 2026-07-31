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
# 👇 Added Boolean and JSON here
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, func, Boolean, JSON
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
    # Preserved your UUID string implementation
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    
    # Basic Information
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    
    # Confidentiality Handlers
    client_name = Column(String, nullable=True)
    is_confidential = Column(Boolean, default=False)
    anonymous_client_label = Column(String, nullable=True)
    
    industry = Column(String, nullable=False)
    location = Column(String, nullable=True)
    country = Column(String, nullable=True)
    completion_year = Column(String, nullable=True)
    project_status = Column(String, nullable=False)

    # Hero & Media
    cover_image = Column(String, nullable=False)
    gallery_images = Column(JSON, default=[])
    video_url = Column(String, nullable=True)

    # Overview
    short_description = Column(String, nullable=False)
    full_overview = Column(Text, nullable=False)

    # Repeatable Node Lists
    engineering_scope = Column(JSON, default=[])
    services_delivered = Column(JSON, default=[])
    technologies_used = Column(JSON, default=[])
    key_results = Column(JSON, default=[])

    # Key Facts
    duration_months = Column(String, nullable=True)
    start_date = Column(String, nullable=True)
    end_date = Column(String, nullable=True)
    engineering_hours = Column(String, nullable=True)
    plant_capacity = Column(String, nullable=True)
    project_budget = Column(String, nullable=True)

    # Case Study Context
    challenges = Column(Text, nullable=True)
    solutions = Column(Text, nullable=True)
    statistics = Column(JSON, default=[])

    # SEO & Metadata
    meta_title = Column(String, nullable=True)
    meta_description = Column(Text, nullable=True)
    og_image = Column(String, nullable=True)

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
    video_url = Column(String, nullable=True)      # <--- ADDED FOR VIDEO
    category = Column(String, nullable=True)       # <--- ADDED FOR CATEGORY
    read_time = Column(String, nullable=True)      # <--- ADDED FOR READ TIME
    whitepaper_url = Column(String, nullable=True) # <--- ADDED FOR PDF WHITEPAPERS
    created_at = Column(DateTime, default=datetime.utcnow)

class DBContactInquiry(Base):
    __tablename__ = "contact_inquiries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50))
    company = Column(String(255))
    service = Column(String(255), nullable=False, index=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())    

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

# ─── NEW: PROJECT STATISTICS HELPER ───
class StatItem(BaseModel):
    value: str
    label: str

class ProjectCreateSchema(BaseModel):
    title: str
    slug: str
    
    client_name: Optional[str] = None
    is_confidential: Optional[bool] = False
    anonymous_client_label: Optional[str] = None
    
    industry: str
    location: Optional[str] = None
    country: Optional[str] = None
    completion_year: Optional[str] = None
    project_status: str

    cover_image: str
    gallery_images: Optional[List[str]] = []
    video_url: Optional[str] = None

    short_description: str
    full_overview: str

    engineering_scope: Optional[List[str]] = []
    services_delivered: Optional[List[str]] = []
    technologies_used: Optional[List[str]] = []
    key_results: Optional[List[str]] = []

    duration_months: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    engineering_hours: Optional[str] = None
    plant_capacity: Optional[str] = None
    project_budget: Optional[str] = None

    challenges: Optional[str] = None
    solutions: Optional[str] = None
    statistics: Optional[List[StatItem]] = []

    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    og_image: Optional[str] = None

class ProjectResponseSchema(ProjectCreateSchema):
    id: str  # Preserved as str to match your DB UUID!
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
    video_url: Optional[str] = None      # <--- ADDED
    category: Optional[str] = None       # <--- ADDED
    read_time: Optional[str] = None      # <--- ADDED
    whitepaper_url: Optional[str] = None # <--- ADDED

class BlogResponseSchema(BlogCreateSchema):
    id: str
    created_at: datetime
    class Config:
        from_attributes = True

class ContactInquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    service: str
    message: str        

class ContactInquiryResponse(ContactInquiryCreate):
    id: int
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
    cleaned_username = payload.username.strip()
    user = db.query(DBUser).filter(func.lower(DBUser.username) == func.lower(cleaned_username)).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid system account credentials.")
    
    provided_password = payload.password.encode('utf-8')
    stored_hash = user.hashed_password.encode('utf-8') if isinstance(user.hashed_password, str) else user.hashed_password
    
    if not bcrypt.checkpw(provided_password, stored_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid system account credentials.")
    
    token_expiry = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data = {"sub": user.username, "exp": token_expiry, "role": user.role}
    encoded_jwt = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    
    return {"access_token": encoded_jwt, "token_type": "bearer", "role": user.role}

# ─── 2. IT MANAGER ONLY: ROLE MANAGEMENT PORTS ────────────────────────────────
@app.get("/api/admin/users", response_model=List[UserResponseSchema])
def get_all_users(db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER]))):
    """IT_MANAGER exclusively fetches all system users."""
    return db.query(DBUser).order_by(DBUser.created_at.desc()).all()

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

# 👇 NEW ENDPOINT: Required for the /projects/[slug] frontend page!
@app.get("/api/projects/{slug}", response_model=ProjectResponseSchema)
def get_single_project_by_slug(slug: str, db: Session = Depends(get_db_session)):
    record = db.query(DBProject).filter(DBProject.slug == slug).first()
    if not record: 
        raise HTTPException(status_code=404, detail="Project entry not found in repository.")
    return record
# 👆 -------------------------------------------------------------------------

@app.post("/api/projects", response_model=ProjectResponseSchema, status_code=status.HTTP_201_CREATED)
def write_new_project(payload: ProjectCreateSchema, db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER, UserRole.ADMIN]))):
    new_record = DBProject(**payload.model_dump())
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

# Note: Changed project_id to int to match SQLAlchemy ID columns
@app.put("/api/projects/{project_id}", response_model=ProjectResponseSchema)
def edit_existing_project(project_id: int, payload: ProjectCreateSchema, db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER, UserRole.ADMIN]))):
    record = db.query(DBProject).filter(DBProject.id == project_id).first()
    if not record: 
        raise HTTPException(status_code=404, detail="Project entry not found in repository.")
    for key, val in payload.model_dump().items():
        setattr(record, key, val)
    db.commit()
    db.refresh(record)
    return record

# Note: Changed project_id to int to match SQLAlchemy ID columns
@app.delete("/api/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_record(project_id: int, db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER, UserRole.ADMIN]))):
    record = db.query(DBProject).filter(DBProject.id == project_id).first()
    if not record: 
        raise HTTPException(status_code=404, detail="Project configuration entry missing.")
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

@app.get("/api/blogs/{slug}", response_model=BlogResponseSchema)
def get_single_blog_by_slug(slug: str, db: Session = Depends(get_db_session)):
    post = db.query(DBBlog).filter(DBBlog.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog publication not found.")
    return post


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
    

# ─── 6. PUBLIC CONTACT FORM INGESTION ───────────────────────────────────────
@app.get("/api/contact", response_model=List[ContactInquiryResponse])
def get_all_contact_inquiries(db: Session = Depends(get_db_session), _=Depends(require_role_clearance([UserRole.IT_MANAGER, UserRole.IT_EXECUTIVE, UserRole.ADMIN]))):
    """Securely fetches all contact form inquiries for the admin dashboard."""
    return db.query(DBContactInquiry).order_by(DBContactInquiry.created_at.desc()).all()

@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
def receive_contact_inquiry(payload: ContactInquiryCreate, db: Session = Depends(get_db_session)):
    """Receives contact form submissions from Next.js and securely logs them to PostgreSQL."""
    try:
        new_inquiry = DBContactInquiry(
            name=payload.name.strip(),
            email=payload.email.strip(),
            phone=payload.phone.strip() if payload.phone else None,
            company=payload.company.strip() if payload.company else None,
            service=payload.service.strip(),
            message=payload.message.strip()
        )
        db.add(new_inquiry)
        db.commit()
        db.refresh(new_inquiry)
        return {"status": "success", "message": "Inquiry securely logged to database", "id": new_inquiry.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"Failed to log inquiry: {str(e)}"
        )