from pathlib import Path
from flask_sqlalchemy import SQLAlchemy

DATABASE_PATH = Path(__file__).with_name("database.db")

db = SQLAlchemy()
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)


