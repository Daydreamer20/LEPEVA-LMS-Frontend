import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { VocabularyGame, Progress } from '../../types';
import { gameAPI } from '../../services/api';

interface GameState {
  games: VocabularyGame[];
  currentGame: VocabularyGame | null;
  gameHistory: Progress[];
  leaderboard: any[];
  isLoading: boolean;
  error: string | null;
  totalGames: number;
  currentPage: number;
  gameSession: any | null;
  adaptedDifficulty: any | null;
  vocabularySuggestions: any | null;
  pronunciationResult: any | null;
}

const initialState: GameState = {
  games: [],
  currentGame: null,
  gameHistory: [],
  leaderboard: [],
  isLoading: false,
  error: null,
  totalGames: 0,
  currentPage: 1,
  gameSession: null,
  adaptedDifficulty: null,
  vocabularySuggestions: null,
  pronunciationResult: null,
};

// Async thunks
export const getAllGames = createAsyncThunk(
  'game/getAllGames',
  async (params: {
    difficulty?: string;
    category?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }, { rejectWithValue }) => {
    try {
      const response = await gameAPI.getAllGames(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch games');
    }
  }
);

export const getGame = createAsyncThunk(
  'game/getGame',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await gameAPI.getGame(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch game');
    }
  }
);

export const startGameSession = createAsyncThunk(
  'game/startGameSession',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await gameAPI.startGameSession(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to start game session');
    }
  }
);

export const submitProgress = createAsyncThunk(
  'game/submitProgress',
  async ({ id, data }: { id: string; data: { score: number; timePlayed: number; completed: boolean } }, { rejectWithValue }) => {
    try {
      const response = await gameAPI.submitProgress(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit progress');
    }
  }
);

export const getGameHistory = createAsyncThunk(
  'game/getGameHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await gameAPI.getGameHistory();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch game history');
    }
  }
);

export const getLeaderboard = createAsyncThunk(
  'game/getLeaderboard',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await gameAPI.getLeaderboard(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch leaderboard');
    }
  }
);

export const checkPronunciation = createAsyncThunk(
  'game/checkPronunciation',
  async (data: { audioData: any; text: string }, { rejectWithValue }) => {
    try {
      const response = await gameAPI.checkPronunciation(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check pronunciation');
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearGameError: (state) => {
      state.error = null;
    },
    clearCurrentGame: (state) => {
      state.currentGame = null;
    },
    clearGameSession: (state) => {
      state.gameSession = null;
      state.adaptedDifficulty = null;
      state.vocabularySuggestions = null;
    },
    clearPronunciationResult: (state) => {
      state.pronunciationResult = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Games
    builder
      .addCase(getAllGames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games = action.payload?.games || [];
        state.totalGames = action.payload?.total || 0;
      })
      .addCase(getAllGames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Game
    builder
      .addCase(getGame.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentGame = action.payload?.game || null;
      })
      .addCase(getGame.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Start Game Session
    builder
      .addCase(startGameSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startGameSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gameSession = action.payload?.gameSession || null;
        state.adaptedDifficulty = action.payload?.adaptedDifficulty || null;
        state.vocabularySuggestions = action.payload?.vocabularySuggestions || null;
      })
      .addCase(startGameSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Submit Progress
    builder
      .addCase(submitProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.progress) {
          state.gameHistory = [...state.gameHistory, action.payload.progress];
        }
      })
      .addCase(submitProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Game History
    builder
      .addCase(getGameHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGameHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gameHistory = action.payload?.history || [];
      })
      .addCase(getGameHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Leaderboard
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaderboard = action.payload?.leaderboard || [];
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Check Pronunciation
    builder
      .addCase(checkPronunciation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkPronunciation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pronunciationResult = action.payload?.result || null;
      })
      .addCase(checkPronunciation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearGameError, clearCurrentGame, clearGameSession, clearPronunciationResult } = gameSlice.actions;
export default gameSlice.reducer; 