from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash
from auth.validators import is_valid_email, is_valid_password
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

    session.clear()
    session.permanent = True
    session["user_id"] = user.id

    return jsonify({
        "message": "User signed in successfully",
        "user": {"id": user.id, "name": user.name, "email": user.email},
    }), 200

@signin_bp.route("/api/me", methods=["GET"])
def current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Authentication required"}), 401

    user = User.query.get(user_id)
    if not user:
        session.clear()
        return jsonify({"error": "Authentication required"}), 401

    return jsonify({
        "user": {"id": user.id, "name": user.name, "email": user.email}
    }), 200

@signin_bp.route("/api/signout", methods=["POST"])
def signout():
    session.clear()
    return jsonify({"message": "Signed out successfully"}), 200
