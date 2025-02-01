import axios from 'axios';
import { ApiResponse, User, Course, Lesson, VocabularyGame, Progress } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (data: Partial<User>) => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', data);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/me');
    return response.data;
  },

  updatePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/update-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },
};

// Course API
export const courseAPI = {
  getAllCourses: async (params?: {
    level?: string;
    category?: string;
    price?: number;
    rating?: number;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get<ApiResponse<{ courses: Course[]; total: number }>>('/courses', { params });
    return response.data;
  },

  getCourse: async (id: string) => {
    const response = await api.get<ApiResponse<{ course: Course }>>(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (data: Partial<Course>) => {
    const response = await api.post<ApiResponse<{ course: Course }>>('/courses', data);
    return response.data;
  },

  updateCourse: async (id: string, data: Partial<Course>) => {
    const response = await api.patch<ApiResponse<{ course: Course }>>(`/courses/${id}`, data);
    return response.data;
  },

  deleteCourse: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/courses/${id}`);
    return response.data;
  },

  enrollCourse: async (id: string) => {
    const response = await api.post<ApiResponse<{ enrollment: Progress }>>(`/courses/${id}/enroll`);
    return response.data;
  },

  getEnrolledCourses: async () => {
    const response = await api.get<ApiResponse<{ enrollments: Progress[] }>>('/courses/enrolled/me');
    return response.data;
  },

  getCourseProgress: async (id: string) => {
    const response = await api.get<ApiResponse<{ progress: Progress }>>(`/courses/${id}/progress`);
    return response.data;
  },

  getTeacherCourses: async () => {
    const response = await api.get<ApiResponse<{ courses: Course[] }>>('/courses/teacher/me');
    return response.data;
  },

  getCourseStatistics: async (id: string) => {
    const response = await api.get<ApiResponse<{ statistics: any }>>(`/courses/${id}/statistics`);
    return response.data;
  },
};

// Vocabulary Game API
export const gameAPI = {
  getAllGames: async (params?: {
    difficulty?: string;
    category?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get<ApiResponse<{ games: VocabularyGame[]; total: number }>>('/vocabulary-games', {
      params,
    });
    return response.data;
  },

  getGame: async (id: string) => {
    const response = await api.get<ApiResponse<{ game: VocabularyGame }>>(`/vocabulary-games/${id}`);
    return response.data;
  },

  startGameSession: async (id: string) => {
    const response = await api.post<ApiResponse<{
      gameSession: any;
      adaptedDifficulty: any;
      vocabularySuggestions: any;
    }>>(`/vocabulary-games/${id}/start`);
    return response.data;
  },

  submitProgress: async (id: string, data: { score: number; timePlayed: number; completed: boolean }) => {
    const response = await api.post<ApiResponse<{ progress: Progress; feedback: any }>>(`/vocabulary-games/${id}/progress`, data);
    return response.data;
  },

  getGameHistory: async () => {
    const response = await api.get<ApiResponse<{ history: Progress[] }>>('/vocabulary-games/history/me');
    return response.data;
  },

  getLeaderboard: async (id: string) => {
    const response = await api.get<ApiResponse<{ leaderboard: any[] }>>(`/vocabulary-games/${id}/leaderboard`);
    return response.data;
  },

  checkPronunciation: async (data: { audioData: any; text: string }) => {
    const response = await api.post<ApiResponse<{ result: any }>>('/vocabulary-games/check-pronunciation', data);
    return response.data;
  },
};

export default api; 