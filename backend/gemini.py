import os
import time
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

        fallback_models = [
            model.strip()
            for model in os.getenv(
                "GEMINI_FALLBACK_MODELS",
                "gemini-3.6-flash,gemini-3.5-flash",
            ).split(",")
            if model.strip()
        ]
        models = [gemini_model] + [
            model for model in fallback_models if model != gemini_model
        ]

        timeout_seconds = int(os.getenv("GEMINI_TIMEOUT_SECONDS", "30"))
        max_retries = int(os.getenv("GEMINI_MAX_RETRIES", "1"))
        config = {"http_options": {"timeout": timeout_seconds * 1000}}

        last_error = None
        response = None

        for model_index, model in enumerate(models):
            for attempt in range(max_retries + 1):
                try:
                    response = ai.models.generate_content(
                        model=model,
                        contents=message,
                        config=config,
                    )
                    break
                except errors.APIError as error:
                    last_error = error
                    status_code = api_error_status(error)
                    if status_code not in (429, 503, 504):
                        raise
                    if attempt < max_retries:
                        time.sleep(1 * (2 ** attempt))
                        continue
                    if model_index == len(models) - 1:
                        raise
                    break
                except Exception as error:
                    last_error = error
                    if attempt < max_retries:
                        time.sleep(1 * (2 ** attempt))
                        continue
                    if model_index == len(models) - 1:
                        raise
                    break

            if response is not None:
                break

        if response is None:
            if last_error:
                raise last_error
            raise RuntimeError("No Gemini model was available")

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
        status_code = api_error_status(error)

        if status_code == 504:
            return jsonify({"error": "The AI timed out after retrying. Please try again."}), 504

        if status_code == 503:
            return jsonify({"error": "The AI is temporarily unavailable. Please try again."}), 503

        if status_code == 429:
            return jsonify({"error": "The AI is receiving too many requests. Please wait and try again."}), 429

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

def api_error_status(error):
    code = getattr(error, "code", None)
    if code is not None:
        try:
            return int(code)
        except (TypeError, ValueError):
            pass

    error_text = str(error).upper()
    for status in (429, 503, 504):
        if str(status) in error_text:
            return status
    if "DEADLINE_EXCEEDED" in error_text:
        return 504
    return None
