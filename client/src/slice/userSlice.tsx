// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { LoginUser } from '../api'

// interface Login{
//     email: string;
//     password: string;
// }

// export const loginUser = createAsyncThunk<Login, 
// { email: string; password: string },
// { rejectValue: RejectWithValue }>('user/loginUser', async ({ email, password }, { rejectWithValue }) => {
//     try {
//         const data = await LoginUser(email, password);
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// });

// const userSlice = createSlice({
//     name: 'user',
//     initialState: { user: null, status: 'idle', error: null },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(loginUser.pending, (state) => { state.status = 'loading'; })
//             .addCase(loginUser.fulfilled, (state, action) => { state.status = 'succeeded'; state.user = action.payload; })
//             .addCase(loginUser.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; });
//     }
// });

// export default userSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUser } from '../api';

// Define a type for the slice state
interface UserState {
  user: null; 
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

export const loginUser = createAsyncThunk<
  null,
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
      });
  },
});

export default userSlice.reducer;

// Selector functions
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectStatus = (state: { user: UserState }) => state.user.status;
export const selectError = (state: { user: UserState }) => state.user.error;

