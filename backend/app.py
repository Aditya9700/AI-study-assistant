from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
from youtube_transcript_api import YouTubeTranscriptApi
import json
import os
import re
from urllib.parse import parse_qs, urlparse

import PyPDF2

load_dotenv()
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

#  Flask App
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return {
        "message": " AI Backend Running Successfully"
    }


def extract_youtube_video_id(youtube_url):
    parsed_url = urlparse(youtube_url)
    hostname = (parsed_url.hostname or "").lower()

    if hostname in {"youtu.be", "www.youtu.be"}:
        return parsed_url.path.lstrip("/") or None

    if "youtube.com" in hostname:
        if parsed_url.path == "/watch":
            return parse_qs(parsed_url.query).get("v", [None])[0]

        shorts_match = re.search(r"/shorts/([^/?]+)", parsed_url.path)
        if shorts_match:
            return shorts_match.group(1)

        embed_match = re.search(r"/embed/([^/?]+)", parsed_url.path)
        if embed_match:
            return embed_match.group(1)

    if re.fullmatch(r"[A-Za-z0-9_-]{11}", youtube_url):
        return youtube_url

    return None


def extract_text_from_pdf(file_path):
    extracted_text = ""

    with open(file_path, "rb") as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)

        for page in reader.pages:
            text = page.extract_text()
            if text:
                extracted_text += text + "\n"

    return extracted_text.strip()


def extract_text_from_youtube(youtube_url):
    video_id = extract_youtube_video_id(youtube_url)

    if not video_id:
        raise ValueError("Invalid YouTube URL")

    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
    except AttributeError:
        transcript = YouTubeTranscriptApi().fetch(video_id)

    transcript_parts = []

    for segment in transcript:
        if hasattr(segment, "text"):
            transcript_parts.append(segment.text)
        else:
            transcript_parts.append(segment["text"])

    return " ".join(transcript_parts)


def build_prompt(study_material):
    return f"""
You are an AI-powered study assistant.

Return valid JSON only, without markdown fences or commentary, using this exact structure:
{{
  "summary": "A concise paragraph summary.",
  "key_points": ["Five concise key points"],
  "concepts": ["Six important concepts"],
  "flashcards": [
    {{"question": "Question text", "answer": "Short answer text"}}
  ],
  "quiz": [
    {{
      "question": "Question text",
      "choices": ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      "answer": 0
    }}
  ]
}}

Create 5 flashcards and 5 quiz questions. Keep the content concise and directly grounded in the study material.

Study material:
{study_material}
"""


def parse_ai_json(response_text):
    cleaned_text = response_text.strip()

    if cleaned_text.startswith("```"):
        cleaned_text = re.sub(r"^```(?:json)?\s*", "", cleaned_text)
        cleaned_text = re.sub(r"\s*```$", "", cleaned_text)

    start = cleaned_text.find("{")
    end = cleaned_text.rfind("}")

    if start != -1 and end != -1:
        cleaned_text = cleaned_text[start:end + 1]

    return json.loads(cleaned_text)


def generate_study_guide(study_material, source_type, source_name):
    prompt = build_prompt(study_material[:12000])

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    guide = parse_ai_json(response.text)

    return {
        "source_type": source_type,
        "source_name": source_name,
        "summary": guide.get("summary", ""),
        "key_points": guide.get("key_points", []),
        "concepts": guide.get("concepts", []),
        "flashcards": guide.get("flashcards", []),
        "quiz": guide.get("quiz", []),
    }


@app.route("/summarize", methods=["POST"])
def summarize_study_material():
    source_type = None
    source_name = None
    study_material = None

    if "file" in request.files:
        file = request.files["file"]

        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        try:
            study_material = extract_text_from_pdf(file_path)
        except Exception as error:
            return jsonify({"error": f"PDF extraction failed: {str(error)}"}), 500

        source_type = "pdf"
        source_name = file.filename

    else:
        youtube_url = request.form.get("youtube_url")

        if not youtube_url and request.is_json:
            payload = request.get_json(silent=True) or {}
            youtube_url = payload.get("youtube_url")

        if not youtube_url:
            return jsonify({"error": "Provide either a PDF file or a YouTube URL"}), 400

        try:
            study_material = extract_text_from_youtube(youtube_url)
        except Exception as error:
            return jsonify({"error": f"YouTube transcript failed: {str(error)}"}), 500

        source_type = "youtube"
        source_name = youtube_url

    if not study_material:
        return jsonify({"error": "No study material could be extracted"}), 400

    try:
        study_guide = generate_study_guide(study_material, source_type, source_name)
        return jsonify(study_guide)
    except json.JSONDecodeError:
        return jsonify({"error": "Gemini returned invalid JSON"}), 500
    except Exception as error:
        return jsonify({"error": f"Gemini API error: {str(error)}"}), 500


# Run Flask Server
if __name__ == "__main__":
    app.run(debug=True)