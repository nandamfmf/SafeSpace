from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from auth.validators import is_valid_email, is_valid_password
from connection import User, db

signup_bp = Blueprint('signup', __name__)

@signup_bp.route("/api/signup", methods=["POST"])
def signup():

    data = request.get_json()

    if not data or "name" not in data or "email" not in data or "password" not in data :
        return jsonify({"error": "Missing name, email or password"}), 400

    if not is_valid_email(data.get("email")):
        return jsonify({"error": "Invalid email format"}), 400

    if not is_valid_password(data.get("password")):
        return jsonify({"error": "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number"}), 400
    
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    user = User(
        name=name,
        email=email,
        password=generate_password_hash(password),
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201
