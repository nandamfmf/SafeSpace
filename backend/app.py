from flask import Flask, request, jsonify
import os
from pathlib import Path
from dotenv import load_dotenv
from flask_cors import CORS
from auth.signin import signin_bp
from auth.signup import signup_bp
from connection import db
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
)

def load_dotenv_config():
    load_dotenv(dotenv_path=Path(__file__).with_name(".env"))
    jwt_secret_key = os.getenv("JWT_SECRET_KEY")

    if not jwt_secret_key or len(jwt_secret_key) < 32:
        raise RuntimeError(
            "JWT_SECRET_KEY must be configured with at least 32 characters"
        )

    return jwt_secret_key

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = load_dotenv_config()

database_url = os.getenv("DATABASE_URL")
if not database_url:
    raise RuntimeError("DATABASE_URL must be configured in the .env file")

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
JWTManager(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# Habilita o CORS para permitir requisições vindas do React
CORS(app)

app.register_blueprint(signin_bp)
app.register_blueprint(signup_bp)
    

if __name__ == "__main__":
    app.run(debug=False)
