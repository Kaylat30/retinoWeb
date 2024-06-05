import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, logoutUser } from '../api';
import { url } from '../api';

interface User {
  firstName: string;
}

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sessionExpiresAt: number | null; 
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') as string) || null,
  status: 'idle',
  error: null,
  sessionExpiresAt: JSON.parse(localStorage.getItem('sessionExpiresAt') as string) || null,
};


export const loginUser = createAsyncThunk<User, { email: string; password: string }, { rejectValue: { message: string } }>(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    const requestBody = {
      email,
      password,
    };

    try {
      const res = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue({ message: data.error });
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login error: ' + error.message);
        return rejectWithValue({ message: error.message });
      } else {
        return rejectWithValue({ message: 'An error occurred while logging in' });
      }
    }
  }
);

export const RegisterUser = createAsyncThunk<User, { firstname: string; lastname: string; email: string; password: string }, { rejectValue: { message: string } }>(
  'user/RegisterUser', async ({ firstname, lastname, email, password }, { rejectWithValue }) => {
    try {
      const data = await registerUser(firstname, lastname, email, password);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const LogoutUser = createAsyncThunk<void>('user/logoutUser', async () => {
  try {
    await logoutUser();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.sessionExpiresAt = null;
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiresAt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null; // Clear error on success
        const sessionDuration = 300000 
        const sessionExpiresAt = Date.now() + sessionDuration;
        state.sessionExpiresAt = sessionExpiresAt;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('sessionExpiresAt', JSON.stringify(sessionExpiresAt));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(RegisterUser.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null; // Clear error on success
        const sessionDuration = 300000
        const sessionExpiresAt = Date.now() + sessionDuration;
        state.sessionExpiresAt = sessionExpiresAt;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('sessionExpiresAt', JSON.stringify(sessionExpiresAt));
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(LogoutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.error = null; // Clear error on success
        localStorage.removeItem('user');
        localStorage.removeItem('sessionExpiresAt');
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Logout failed'; // Set error message
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

// Selector functions
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectStatus = (state: { user: UserState }) => state.user.status;
export const selectError = (state: { user: UserState }) => state.user.error;
export const selectSessionExpiresAt = (state: { user: UserState }) => state.user.sessionExpiresAt;
export const selectFirstName = (state: { user: UserState }) => state.user.user?.firstName;
