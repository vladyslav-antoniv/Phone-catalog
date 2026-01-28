import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User, Session as SupabaseSession } from "@supabase/supabase-js"; // Import Supabase types
import { loginUser, registerUser, logoutUser } from "./auth.service";

// 1. Define your custom Session shape (matches what CartPage expects)
export interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  accessToken: string;
}

interface AuthState {
  user: User | null;
  isPending: boolean;
  error: string | null;
  session: Session | null;
}

const initialState: AuthState = {
  user: null,
  isPending: false,
  error: null,
  session: null,
};

// 2. Helper to map Supabase data to your custom Session shape
const mapToSession = (user: User | null, sbSession: SupabaseSession | null): Session | null => {
  if (!user || !sbSession) return null;
  return {
    accessToken: sbSession.access_token,
    user: {
      id: user.id,
      email: user.email || "",
      // Supabase stores names in user_metadata
      name: user.user_metadata?.name || user.user_metadata?.full_name,
    },
  };
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await loginUser(email, password);
    // Return the WHOLE response (user + session), not just user
    return response; 
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const response = await registerUser(email, password, name);
    return response;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      // If we manually set user null, clear session too
      if (!action.payload) {
        state.session = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // === LOGIN ===
      .addCase(login.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isPending = false;
        state.user = action.payload.user;
        // ⚡ FIX: Populate the session state
        state.session = mapToSession(action.payload.user, action.payload.session);
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message || "Login failed";
        state.session = null;
      })

      // === REGISTER ===
      .addCase(register.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isPending = false;
        state.user = action.payload.user;
        // ⚡ FIX: Populate the session state
        state.session = mapToSession(action.payload.user, action.payload.session);
      })
      .addCase(register.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message || "Registration failed";
        state.session = null;
      })

      // === LOGOUT ===
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.session = null; // ⚡ FIX: Clear session on logout
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;