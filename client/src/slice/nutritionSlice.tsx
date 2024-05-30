import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addNutritionRecord, getAllNutritionRecords, updateNutritionRecord, deleteNutritionRecord } from '../api'; // Adjust imports based on your API structure
//import { WritableDraft } from 'immer';

interface NutritionRecord {
  id: string;
  food: string;
  calories: number;
  date: string;
}

interface NutritionState {
  nutritionRecords: NutritionRecord[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NutritionState = {
  nutritionRecords: [],
  status: 'idle',
  error: null,
};

interface RejectWithValue {
  message: string;
}

// Async thunk for adding a nutrition record
export const AddNutritionRecord = createAsyncThunk<NutritionRecord, string[], { rejectValue: RejectWithValue }>(
  'nutrition/addNutritionRecord',
  async (foods, { rejectWithValue }) => {
    try {
      const data = await addNutritionRecord(foods);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding nutrition record:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while adding nutrition record' });
    }
  }
);

// Async thunk for fetching all nutrition records
export const GetAllNutritionRecords = createAsyncThunk<NutritionRecord[], void, { rejectValue: RejectWithValue }>(
  'nutrition/getAllNutritionRecords',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllNutritionRecords();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching nutrition records:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while fetching nutrition records' });
    }
  }
);

// Async thunk for updating a nutrition record
export const UpdateNutritionRecord = createAsyncThunk<NutritionRecord, { id: string; food: string; calories: number; date: string }, { rejectValue: RejectWithValue }>(
  'nutrition/updateNutritionRecord',
  async ({ id, food, calories, date }, { rejectWithValue }) => {
    try {
      const data = await updateNutritionRecord(id, food, calories, date);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating nutrition record:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while updating nutrition record' });
    }
  }
);

// Async thunk for deleting a nutrition record
export const DeleteNutritionRecord = createAsyncThunk<void, string, { rejectValue: RejectWithValue }>(
  'nutrition/deleteNutritionRecord',
  async (nutritionId, { rejectWithValue }) => {
    try {
      await deleteNutritionRecord(nutritionId);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting nutrition record:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while deleting nutrition record' });
    }
  }
);

const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddNutritionRecord.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(AddNutritionRecord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.nutritionRecords.push(action.payload); // Add new record to the array
        state.error = null; // Clear error on success
      })
      .addCase(AddNutritionRecord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(GetAllNutritionRecords.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(GetAllNutritionRecords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.nutritionRecords = action.payload; // Update with fetched records
        state.error = null; // Clear error on success
      })
      .addCase(GetAllNutritionRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(UpdateNutritionRecord.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(UpdateNutritionRecord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, food, calories, date } = action.payload;
        const existingRecordIndex = state.nutritionRecords.findIndex((record) => record.id === id);
        if (existingRecordIndex !== -1) {
          state.nutritionRecords[existingRecordIndex] = { id, food, calories, date };
        }
        state.error = null; // Clear error on success
      })
      .addCase(UpdateNutritionRecord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(DeleteNutritionRecord.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(DeleteNutritionRecord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const nutritionId = action.meta.arg;
        state.nutritionRecords = state.nutritionRecords.filter((record) => record.id !== nutritionId);
        state.error = null; // Clear error on success
      })
      .addCase(DeleteNutritionRecord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      });
  },
});

export default nutritionSlice.reducer;

// Selector functions
export const selectNutritionRecords = (state: { nutrition: NutritionState }) => state.nutrition.nutritionRecords;
export const selectNutritionStatus = (state: { nutrition: NutritionState }) => state.nutrition.status;
export const selectNutritionError = (state: { nutrition: NutritionState }) => state.nutrition.error;
