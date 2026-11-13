import token
from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from auth.validators import is_valid_email, is_valid_password
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from connection import User

signin_bp = Blueprint('signin', __name__)

@signin_bp.route("/api/signin", methods=["POST"])
def signin():

    data = request.get_json()

    if not data or "email" not in data or "password" not in data:
        return jsonify({"error": "Missing email or password"}), 400

    if not is_valid_email(data.get("email")):
        return jsonify({"error": "Invalid email format"}), 400

    if not is_valid_password(data.get("password")):
        return jsonify({"error": "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number"}), 400

    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if not check_password_hash(user.password, password):
        return jsonify({"error": "Incorrect password"}), 401

    return jsonify({
        "message": "User signed in successfully",
        "user": {"id": user.id, "name": user.name, "email": user.email},
        "token": create_access_token(identity=user.email)
    }), 200

@signin_bp.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user}. This is a protected route."}), 200
