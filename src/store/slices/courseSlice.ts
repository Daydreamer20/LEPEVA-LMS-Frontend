import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Course, Progress } from '../../types';
import { courseAPI } from '../../services/api';

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  enrolledCourses: Progress[];
  teacherCourses: Course[];
  isLoading: boolean;
  error: string | null;
  totalCourses: number;
  currentPage: number;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  enrolledCourses: [],
  teacherCourses: [],
  isLoading: false,
  error: null,
  totalCourses: 0,
  currentPage: 1,
};

// Async thunks
export const getAllCourses = createAsyncThunk(
  'course/getAllCourses',
  async (params: {
    level?: string;
    category?: string;
    price?: number;
    rating?: number;
    search?: string;
    page?: number;
    limit?: number;
  }, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getAllCourses(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses');
    }
  }
);

export const getCourse = createAsyncThunk(
  'course/getCourse',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getCourse(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch course');
    }
  }
);

export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (data: Partial<Course>, { rejectWithValue }) => {
    try {
      const response = await courseAPI.createCourse(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create course');
    }
  }
);

export const updateCourse = createAsyncThunk(
  'course/updateCourse',
  async ({ id, data }: { id: string; data: Partial<Course> }, { rejectWithValue }) => {
    try {
      const response = await courseAPI.updateCourse(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update course');
    }
  }
);

export const enrollCourse = createAsyncThunk(
  'course/enrollCourse',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await courseAPI.enrollCourse(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to enroll in course');
    }
  }
);

export const getEnrolledCourses = createAsyncThunk(
  'course/getEnrolledCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getEnrolledCourses();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch enrolled courses');
    }
  }
);

export const getTeacherCourses = createAsyncThunk(
  'course/getTeacherCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getTeacherCourses();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch teacher courses');
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearCourseError: (state) => {
      state.error = null;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Courses
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload?.courses || [];
        state.totalCourses = action.payload?.total || 0;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Course
    builder
      .addCase(getCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourse = action.payload?.course || null;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create Course
    builder
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacherCourses = [...state.teacherCourses, action.payload?.course];
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Course
    builder
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourse = action.payload?.course || null;
        state.teacherCourses = state.teacherCourses.map((course) =>
          course.id === action.payload?.course.id ? action.payload.course : course
        );
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Enroll Course
    builder
      .addCase(enrollCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrolledCourses = [...state.enrolledCourses, action.payload?.enrollment];
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Enrolled Courses
    builder
      .addCase(getEnrolledCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEnrolledCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrolledCourses = action.payload?.enrollments || [];
      })
      .addCase(getEnrolledCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Teacher Courses
    builder
      .addCase(getTeacherCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTeacherCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacherCourses = action.payload?.courses || [];
      })
      .addCase(getTeacherCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCourseError, clearCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer; 