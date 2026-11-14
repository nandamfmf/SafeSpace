from flask import Flask
import os
from pathlib import Path
from dotenv import load_dotenv
from flask_cors import CORS
from flask_session import Session
from ai.gemini import gemini_bp
from auth.signin import signin_bp
from auth.signup import signup_bp
from connection import db

def load_dotenv_config():
    load_dotenv(dotenv_path=Path(__file__).with_name(".env"))
    session_secret_key = os.getenv("SESSION_SECRET_KEY")

    if not session_secret_key or len(session_secret_key) < 32:
        raise RuntimeError(
            "SESSION_SECRET_KEY must be configured with at least 32 characters"
        )

    return session_secret_key

app = Flask(__name__)
app.config["SECRET_KEY"] = load_dotenv_config()
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_FILE_DIR"] = Path(__file__).with_name(".flask_session")
app.config["SESSION_PERMANENT"] = True
app.config["PERMANENT_SESSION_LIFETIME"] = 60 * 60 * 8
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = os.getenv("SESSION_COOKIE_SECURE", "false").lower() == "true"

database_url = os.getenv("DATABASE_URL")
if not database_url:
    raise RuntimeError("DATABASE_URL must be configured in the .env file")

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
db.init_app(app)
Session(app)

with app.app_context():
    db.create_all()

CORS(
    app,
    origins=["http://localhost:5173"],
    supports_credentials=True,
)

app.register_blueprint(signin_bp)
app.register_blueprint(signup_bp)
app.register_blueprint(gemini_bp)
    

if __name__ == "__main__":
    app.run(debug=False)
