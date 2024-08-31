import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async Thunks for login and signup
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        credentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
