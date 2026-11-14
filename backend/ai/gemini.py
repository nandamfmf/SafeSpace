import json
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from flask import Blueprint, jsonify, request, session


gemini_bp = Blueprint("gemini", __name__)

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")
GEMINI_API_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    f"{GEMINI_MODEL}:generateContent"
)


@gemini_bp.route("/api/gemini", methods=["POST"])
def generate_gemini_response():
    if not session.get("user_id"):
        return jsonify({"error": "Authentication required"}), 401

    data = request.get_json(silent=True)
    message = data.get("message") if isinstance(data, dict) else None

    if not isinstance(message, str) or not message.strip():
        return jsonify({"error": "Message is required"}), 400

    message = message.strip()
    if len(message) > 4000:
        return jsonify({"error": "Message must be 4000 characters or fewer"}), 400

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return jsonify({"error": "Gemini is not configured on the backend"}), 503

    payload = json.dumps(
        {"contents": [{"parts": [{"text": message}]}]}
    ).encode("utf-8")
    request_headers = {"Content-Type": "application/json"}
    gemini_request = Request(
        f"{GEMINI_API_URL}?key={api_key}",
        data=payload,
        headers=request_headers,
        method="POST",
    )

    try:
        with urlopen(gemini_request, timeout=30) as response:
            response_data = json.loads(response.read().decode("utf-8"))
    except HTTPError as error:
        if error.code in (400, 401, 403):
            return jsonify({"error": "Gemini rejected the request"}), 502
        return jsonify({"error": "Gemini is temporarily unavailable"}), 502
    except (URLError, TimeoutError, json.JSONDecodeError):
        return jsonify({"error": "Could not reach Gemini"}), 502

    try:
        text = response_data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError, TypeError):
        return jsonify({"error": "Gemini returned an invalid response"}), 502

    return jsonify({"response": text}), 200
