// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'teacher' | 'learner';
  profilePicture?: string;
  isActive: boolean;
  lastLogin?: Date;
  preferences: Record<string, any>;
  languageLevel?: 'beginner' | 'intermediate' | 'advanced';
  learningGoals: string[];
  achievements: {
    badges: string[];
    points: number;
    completedLessons: number;
    streak: number;
  };
}

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail?: string;
  duration: number;
  objectives: string[];
  prerequisites: string[];
  isPublished: boolean;
  price: number;
  rating: number;
  totalEnrollments: number;
  completionCriteria: {
    minQuizScore: number;
    requiredActivities: string[];
    minCompletionTime: number;
  };
  metadata: Record<string, any>;
  teacher?: User;
  lessons?: Lesson[];
}

// Lesson types
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: {
    sections: any[];
    exercises: any[];
    resources: any[];
  };
  order: number;
  duration: number;
  type: 'video' | 'text' | 'quiz' | 'exercise' | 'game';
  difficulty: 'easy' | 'medium' | 'hard';
  objectives: string[];
  prerequisites: string[];
  resources: {
    videos: string[];
    documents: string[];
    links: string[];
  };
  isPublished: boolean;
  aiAssistance: {
    enabled: boolean;
    features: {
      pronunciationCheck: boolean;
      grammarCorrection: boolean;
      vocabularySuggestions: boolean;
    };
  };
  metadata: Record<string, any>;
}

// Vocabulary Game types
export interface VocabularyGame {
  id: string;
  title: string;
  description: string;
  type: 'flashcards' | 'word_match' | 'spelling_bee' | 'word_search' | 'crossword' | 'pronunciation_challenge';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  vocabulary: {
    words: string[];
    phrases: string[];
    definitions: string[];
    examples: string[];
  };
  gameRules: {
    timeLimit: number;
    maxAttempts: number;
    pointsPerCorrect: number;
    penaltyPerWrong: number;
    minScoreToPass: number;
  };
  aiSettings: {
    adaptiveDifficulty: boolean;
    pronunciationCheck: boolean;
    contextualHints: boolean;
    personalizedFeedback: boolean;
  };
  rewards: {
    points: number;
    badges: string[];
    achievements: string[];
  };
  isActive: boolean;
  metadata: {
    tags: string[];
    recommendedAge: number | null;
    estimatedDuration: number;
    skillsFocus: string[];
  };
  statistics: {
    totalPlays: number;
    averageScore: number;
    completionRate: number;
    difficultyRating: number;
  };
}

// Progress types
export interface Progress {
  userId: string;
  courseId?: string;
  lessonId?: string;
  gameId?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  score?: number;
  timeSpent: number;
  completedAt?: Date;
  notes?: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// API Response types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  error?: string;
} 