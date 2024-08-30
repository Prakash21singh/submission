import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface SyllabusItem {
  _id: string;
  week: number;
  topic: string;
  content: string;
}

interface Course {
  _id: string;
  name: string;
  description: string;
  duration: string;
  enrollmentStatus: string;
  instructor: string;
  likes: number;
  location: string;
  prerequisites: string[];
  schedule: string;
  syllabus: SyllabusItem[];
  length: number;
  thumbnail: string;
  updatedAt: string;
}

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get<Course[]>(
      "http://localhost:5000/api/courses"
    );
    console.log(response.data);
    return response.data;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    updateCourseLikes(
      state,
      action: PayloadAction<{ courseId: string; likes: number }>
    ) {
      const { courseId, likes } = action.payload;
      const course = state.courses.find((c) => c._id === courseId);
      if (course) {
        course.likes = likes;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
      });
  },
});

export const selectCourseById = (state: { courses: CourseState }, id: string) =>
  state.courses.courses.find((course) => course._id === id);

export const { updateCourseLikes } = courseSlice.actions;
export default courseSlice.reducer;
