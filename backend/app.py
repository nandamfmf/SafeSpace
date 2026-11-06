from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Habilita o CORS para permitir requisições vindas do React
CORS(app)

@app.route("/api/login", methods=["POST"])
def login():

    # O request.get_json() é usado para obter os dados enviados no corpo da requisição
    data = request.get_json()

    if not data or "email" not in data or "password" not in data:
        # O jsonify() é usado para criar uma resposta JSON. O 400 é o código de status HTTP para "Bad Request"
        return jsonify({"error": "Missing email or password"}), 400
    else:
        email = data.get("email")
        password = data.get("password")
        print(f"Email: {email}, Password: {password}")
        return jsonify({"message": "Login received", "email": email}), 200


if __name__ == "__main__":
    app.run(debug=True)

