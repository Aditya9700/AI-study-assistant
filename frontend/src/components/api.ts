import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export type StudyFlashcard = {
  question: string;
  answer: string;
};

export type StudyQuizQuestion = {
  question: string;
  choices: string[];
  answer: number;
};

export type StudyMaterialResponse = {
  source_type: "pdf" | "youtube" | string;
  source_name: string;
  summary: string;
  key_points: string[];
  concepts: string[];
  flashcards: StudyFlashcard[];
  quiz: StudyQuizQuestion[];
};

type SubmitStudyMaterialInput = {
  file?: File;
  youtubeUrl?: string;
};

export const submitStudyMaterial = async ({ file, youtubeUrl }: SubmitStudyMaterialInput) => {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  if (youtubeUrl) {
    formData.append("youtube_url", youtubeUrl);
  }

  const response = await axios.post<StudyMaterialResponse>(`${API_BASE_URL}/summarize`, formData);

  return response.data;
};