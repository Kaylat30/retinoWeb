import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addCheckup, getAllCheckups, updateCheckup, deleteCheckup } from '../api'; // Adjust imports based on your API structure
//import { WritableDraft } from 'immer';

interface Checkup {
  id: string;
  date: string;
  clinic?: string;
  glucose?: string;
  hemoglobin?: string;
  urinalysis?: string;
}

interface CheckupsState {
  checkups: Checkup[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CheckupsState = {
  checkups: [],
  status: 'idle',
  error: null,
};

interface RejectWithValue {
  message: string;
}

// Async thunk for adding a checkup
export const AddCheckup = createAsyncThunk<Checkup, string, { rejectValue: RejectWithValue }>(
  'checkups/addCheckup',
  async (date, { rejectWithValue }) => {
    try {
      const data = await addCheckup(date);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding checkup:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while adding checkup' });
    }
  }
);

// Async thunk for fetching all checkups
export const GetAllCheckups = createAsyncThunk<Checkup[], void, { rejectValue: RejectWithValue }>(
  'checkups/getAllCheckups',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllCheckups();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching checkups:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while fetching checkups' });
    }
  }
);

// Async thunk for updating a checkup
export const UpdateCheckup = createAsyncThunk<Checkup, {
  clinic: string;
  id: string;
  glucose: string;
  hemoglobin: string;
  urinalysis: string;
}, { rejectValue: RejectWithValue }>(
  'checkups/updateCheckup',
  async ({ clinic, id, glucose, hemoglobin, urinalysis }, { rejectWithValue }) => {
    try {
      const data = await updateCheckup(clinic, id, glucose, hemoglobin, urinalysis);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating checkup:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while updating checkup' });
    }
  }
);

// Async thunk for deleting a checkup
export const DeleteCheckup = createAsyncThunk<void, string, { rejectValue: RejectWithValue }>(
  'checkups/deleteCheckup',
  async (checkupId, { rejectWithValue }) => {
    try {
      await deleteCheckup(checkupId);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting checkup:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while deleting checkup' });
    }
  }
);

const checkupsSlice = createSlice({
  name: 'checkups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddCheckup.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(AddCheckup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.checkups.push(action.payload); // Add new checkup to the array
        state.error = null; // Clear error on success
      })
      .addCase(AddCheckup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(GetAllCheckups.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(GetAllCheckups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.checkups = action.payload; // Update with fetched checkups
        state.error = null; // Clear error on success
      })
      .addCase(GetAllCheckups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(UpdateCheckup.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(UpdateCheckup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, clinic, glucose, hemoglobin, urinalysis } = action.payload;
        const existingCheckupIndex = state.checkups.findIndex((checkup) => checkup.id === id);
        if (existingCheckupIndex !== -1) {
          state.checkups[existingCheckupIndex] = { ...state.checkups[existingCheckupIndex], clinic, glucose, hemoglobin, urinalysis };
        }
        state.error = null; // Clear error on success
      })
      .addCase(UpdateCheckup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(DeleteCheckup.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(DeleteCheckup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const checkupId = action.meta.arg;
        state.checkups = state.checkups.filter((checkup) => checkup.id !== checkupId);
        state.error = null; // Clear error on success
      })
      .addCase(DeleteCheckup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      });
  },
});

export default checkupsSlice.reducer;

// Selector functions
export const selectCheckups = (state: { checkups: CheckupsState }) => state.checkups.checkups;
export const selectCheckupsStatus = (state: { checkups: CheckupsState }) => state.checkups.status;
export const selectCheckupsError = (state: { checkups: CheckupsState }) => state.checkups.error;
