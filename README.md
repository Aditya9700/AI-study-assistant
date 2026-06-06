# AI Study Assistant

AI Study Assistant is a web application designed to help students and learners study more effectively. By processing uploaded PDF textbooks or YouTube video links, the application uses the Gemini API to automatically generate comprehensive summaries, key concepts, interactive flashcards, and quizzes.

The project features a React frontend using TanStack Start and a Python Flask backend. It includes built-in user authentication and MongoDB integration to store user workspaces, history, and generated study material.

## Features

- Material Summarization: Extract content from PDF files and YouTube videos to generate concise and readable summaries.
- Key Points and Concepts: Automatically identify and list core study points and critical terms.
- Interactive Flashcards: Generate flashcard decks based on the source material to test retention.
- Practice Quizzes: Create multiple-choice quizzes with feedback to self-assess understanding.
- User Authentication: Secure signup and login system to manage user accounts and sessions.
- MongoDB Storage: Persistence layer storing user accounts, workspace history, and generated study guides.

## Technology Stack

### Frontend
- React 19
- TanStack Start (for Server-Side Rendering)
- React Router
- TailwindCSS & Radix UI
- Axios (for API requests)

### Backend
- Python 3.x
- Flask (for API endpoints)
- Google GenAI SDK (Gemini 2.5 Flash)
- MongoDB & PyMongo
- YouTube Transcript API
- PyPDF2 (for PDF text extraction)

## Project Structure

```
├── backend/                  # Flask API server
│   ├── app.py                # Main server entrypoint
│   ├── .env.example          # Environment variables template
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React application
│   ├── src/                  # Source files
│   │   ├── components/       # Reusable components
│   │   ├── routes/           # TanStack router page components
│   │   └── server.ts         # Cloudflare worker entrypoint
│   ├── vite.config.ts        # Vite build configuration
│   ├── wrangler.jsonc        # Cloudflare wrangler configuration
│   └── .env.example          # Frontend env variables template
└── .gitignore                # Root git ignore definitions
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.10 or higher)
- MongoDB instance (local or Atlas)
- Gemini API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Unix/macOS:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy the environment template and configure your secrets:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and set your `GEMINI_API_KEY` and MongoDB URI connection details.
5. Start the backend server:
   ```bash
   python app.py
   ```
   The backend will run on `http://127.0.0.1:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
   Modify the `.env` file if your backend is running on a different port or host.
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` in your browser to view the application.

## Deployment

### Frontend
The frontend is built on top of TanStack Start and is ready to deploy to Cloudflare Pages or Cloudflare Workers. It uses wrangler for configuration. To deploy:
```bash
npm run build
npx wrangler deploy
```

### Backend
The backend Flask server is deployable to platforms like Render, Railway, or Heroku. Ensure environment variables (`GEMINI_API_KEY`, MongoDB URI, etc.) are correctly set on the host platform.
