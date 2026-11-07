from connection import get_connection
import re
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash

app = Flask(__name__)

# Habilita o CORS para permitir requisições vindas do React
CORS(app)

def generate_password_hash(password):
    import hashlib
    return hashlib.sha256(password.encode()).hexdigest()

def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) 

def is_valid_password(password):
    # Verifica se a senha tem pelo menos 6 caracteres, uma letra maiúscula, uma letra minúscula e um número
    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$'
    return re.match(pattern, password)

@app.route("/api/signup", methods=["POST"])
def signup():

    # O request.get_json() é usado para obter os dados enviados no corpo da requisição
    data = request.get_json()

    if not data or "name" not in data or "email" not in data or "password" not in data :
        # O jsonify() é usado para criar uma resposta JSON. O 400 é o código de status HTTP para "Bad Request"
        return jsonify({"error": "Missing name, email or password"}), 400

    if not is_valid_email(data.get("email")):
        return jsonify({"error": "Invalid email format"}), 400

    if not is_valid_password(data.get("password")):
        return jsonify({"error": "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number"}), 400
    
    else:
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        with get_connection() as con:
            cursor = con.cursor()
            cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
            user = cursor.fetchone()
            if user:
                return jsonify({"error": "User already exists"}), 400

            cursor.execute(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                (name, email, generate_password_hash(password)),
            )

        return jsonify({"message": "User created successfully"}), 201

        

if __name__ == "__main__":
    app.run(debug=True)

