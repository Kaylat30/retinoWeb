import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addEyeScreening,
  getAllEyeScreenings,
  updateEyeScreening,
  deleteEyeScreening,
} from '../api';

interface EyeScreening {
  _id: string;
  date: string;
  clinic?: string;
  risk?: number;
  visual?: number;
  intraocular?: number;
  serum?: number;
}

interface EyeScreeningsState {
  eyeScreenings: EyeScreening[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EyeScreeningsState = {
  eyeScreenings: [],
  status: 'idle',
  error: null,
};

interface RejectWithValue {
  message: string;
}

// Async thunk for adding an eye screening
export const AddEyeScreening = createAsyncThunk<EyeScreening, string, { rejectValue: RejectWithValue }>(
  'eyeScreenings/addEyeScreening',
  async (date, { rejectWithValue }) => {
    try {
      const data = await addEyeScreening(date);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding eye screening:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while adding eye screening' });
    }
  }
);

// Async thunk for fetching all eye screenings
export const GetAllEyeScreenings = createAsyncThunk<EyeScreening[], void, { rejectValue: RejectWithValue }>(
  'eyeScreenings/getAllEyeScreenings',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllEyeScreenings();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching eye screenings:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while fetching eye screenings' });
    }
  }
);

// Async thunk for updating an eye screening
export const UpdateEyeScreening = createAsyncThunk<EyeScreening, {
  id: string;
  clinic: string;
  risk: number;
  visual: number;
  intraocular: number;
  serum: number;
}, { rejectValue: RejectWithValue }>(
  'eyeScreenings/updateEyeScreening',
  async ({ id, clinic, risk, visual, intraocular, serum }, { rejectWithValue }) => {
    try {
      const data = await updateEyeScreening(id, clinic, risk, visual, intraocular, serum);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating eye screening:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while updating eye screening' });
    }
  }
);

// Async thunk for deleting an eye screening
export const DeleteEyeScreening = createAsyncThunk<void, string, { rejectValue: RejectWithValue }>(
  'eyeScreenings/deleteEyeScreening',
  async (eyeScreeningId, { rejectWithValue }) => {
    try {
      await deleteEyeScreening(eyeScreeningId);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting eye screening:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while deleting eye screening' });
    }
  }
);

const eyeScreeningsSlice = createSlice({
  name: 'eyeScreenings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddEyeScreening.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(AddEyeScreening.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eyeScreenings.push(action.payload); // Add new eye screening to the array
        state.error = null; // Clear error on success
      })
      .addCase(AddEyeScreening.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(GetAllEyeScreenings.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(GetAllEyeScreenings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eyeScreenings = action.payload; // Update with fetched eye screenings
        state.error = null; // Clear error on success
      })
      .addCase(GetAllEyeScreenings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(UpdateEyeScreening.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(UpdateEyeScreening.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { _id, clinic, risk, visual, intraocular, serum } = action.payload;
        const existingEyeScreeningIndex = state.eyeScreenings.findIndex((eyeScreening) => eyeScreening._id === _id);
        if (existingEyeScreeningIndex !== -1) {
          state.eyeScreenings[existingEyeScreeningIndex] = {
            ...state.eyeScreenings[existingEyeScreeningIndex],
            clinic,
            risk,
            visual,
            intraocular,
            serum,
          };
        }
        state.error = null; // Clear error on success
      })
      .addCase(UpdateEyeScreening.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(DeleteEyeScreening.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(DeleteEyeScreening.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const eyeScreeningId = action.meta.arg;
        state.eyeScreenings = state.eyeScreenings.filter((eyeScreening) => eyeScreening._id !== eyeScreeningId);
        state.error = null; // Clear error on success
      })
      .addCase(DeleteEyeScreening.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      });
  },
});

export default eyeScreeningsSlice.reducer;

// Selector functions
export const selectEyeScreenings = (state: { eyeScreenings: EyeScreeningsState }) => state.eyeScreenings.eyeScreenings;
export const selectEyeScreeningsStatus = (state: { eyeScreenings: EyeScreeningsState }) => state.eyeScreenings.status;
export const selectEyeScreeningsError = (state: { eyeScreenings: EyeScreeningsState }) => state.eyeScreenings.error;
