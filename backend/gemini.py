import os
from flask import jsonify, Blueprint, request
from google import genai

gemini_bp = Blueprint("gemini", __name__)

@gemini_bp.route("/api/gemini", methods=["POST"])
def gemini_response():

    api_key = os.getenv("GEMINI_API_KEY")
    gemini_model = os.getenv("GEMINI_MODEL")

    data = request.get_json()
    message = data.get("message") if data else None

    if not api_key or not gemini_model:
        return jsonify({"error": "Gemini API key or model not set."}), 400

    if not message:
        return jsonify({"error": "No message provided."}), 400

    ai = genai.Client(api_key=api_key)

    response = ai.models.generate_content(
        model=gemini_model,
        contents=message,
    )

    return jsonify({"response": response.text if response else "No response from AI."})
    
