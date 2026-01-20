import {
  createAsyncThunk,
  createSlice,
  isPending,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import { loginUser, registerUser, logoutUser } from "./auth.service";
import { email } from "zod";

interface AuthState {
  user: User | null;
  isPending: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isPending: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await loginUser(email, password);
    return response.user;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    const response = await registerUser(email, password, name);
    return response.user;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  logoutUser();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //LOGIN
      .addCase(login.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isPending = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message || "Login failed";
      })
      // REGISTER
      .addCase(register.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isPending = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message || "Registration failed";
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;