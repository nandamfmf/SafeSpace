import os
from flask import Blueprint, jsonify, request, session
from google import genai
from google.genai import errors

from connection import Conversation, db

gemini_bp = Blueprint("gemini", __name__)

@gemini_bp.route("/api/gemini", methods=["POST"])
def gemini_response():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Authentication required"}), 401

    api_key = os.getenv("GEMINI_API_KEY")
    gemini_model = os.getenv("GEMINI_MODEL")

    data = request.get_json()
    message = data.get("message") if data else None

    if not api_key or not gemini_model:
        return jsonify({"error": "Gemini API key or model not set."}), 400

    if not message:
        return jsonify({"error": "No message provided."}), 400

    try:
        ai = genai.Client(api_key=api_key)

        response = ai.models.generate_content(
            model=gemini_model,
            contents=message,
        )

        response_text = response.text.strip() if response and response.text else ""
        if not response_text:
            return jsonify({"error": "AI returned an empty response."}), 502

        conversation = Conversation(
            user_id=user_id,
            message=message,
            response=response_text,
        )
        db.session.add(conversation)
        db.session.commit()

        return jsonify({"response": response_text}), 200

    except errors.APIError as error:
        status_code = getattr(error, "code", None)

        if status_code == 503:
            return jsonify({"error": "Service unavailable. Please try again later."}), 503

        return jsonify({"error": f"An error occurred: {str(error)}"}), 502

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"An unexpected error occurred: {str(error)}"}), 502


@gemini_bp.route("/api/conversations", methods=["GET"])
def conversation_history():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Authentication required"}), 401

    conversations = (
        Conversation.query
        .filter_by(user_id=user_id).order_by(Conversation.created_at.desc()).all()
    )

    return jsonify({
        "conversations": [
            {
                "id": conversation.id,
                "message": conversation.message,
                "response": conversation.response,
                "created_at": conversation.created_at.isoformat(),
            }
            for conversation in conversations
        ]
    }), 200
