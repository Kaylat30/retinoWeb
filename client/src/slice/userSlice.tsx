

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUser, registerUser, logoutUser } from '../api'; // Make sure to import logoutUser


interface User {
  firstName: string;
 
}

// Define a type for the slice state
interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

// Define a type for the error in case of rejected promise
interface RejectWithValue {
  message: string;
}

// Async thunk for login
export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: RejectWithValue }
>('user/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const data = await LoginUser(email, password);
    return data; 
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
  }
});

// Async thunk for registration
export const RegisterUser = createAsyncThunk<
  User,
  { firstname: string; lastname: string; email: string; password: string },
  { rejectValue: RejectWithValue }
>('user/RegisterUser', async ({ firstname, lastname, email, password }, { rejectWithValue }) => {
  try {
    const data = await registerUser(firstname, lastname, email, password);
    return data; 
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
  }
});

// Async thunk for logout
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
  reducers: {},
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
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Logout failed'; // Set error message
      });
  },
});

export default userSlice.reducer;

// Selector functions
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectStatus = (state: { user: UserState }) => state.user.status;
export const selectError = (state: { user: UserState }) => state.user.error;
