from flask import Flask, request, jsonify
import os
from pathlib import Path
from dotenv import load_dotenv
from flask_cors import CORS
from auth.signin import signin_bp
from auth.signup import signup_bp
from connection import DATABASE_PATH, db
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
)

def load_dontenv():
    load_dotenv(dotenv_path=Path(__file__).with_name(".env.example"))
    jwt_secret_key = os.getenv("JWT_SECRET_KEY")

    if not jwt_secret_key:
        raise RuntimeError("JWT_SECRET_KEY must be configured in the environment")

    return jwt_secret_key

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = load_dontenv()
JWTManager(app)
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DATABASE_PATH}"
db.init_app(app)

with app.app_context():
    db.create_all()

# Habilita o CORS para permitir requisições vindas do React
CORS(app)

app.register_blueprint(signin_bp)
app.register_blueprint(signup_bp)
    

if __name__ == "__main__":
    app.run(debug=True)
