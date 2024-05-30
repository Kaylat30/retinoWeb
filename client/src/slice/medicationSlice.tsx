import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addMedication,
  getAllMedicationRecords,
  updateMedicationRecord,
  deleteMedicationRecord,
} from '../api'; // Adjust imports based on your API structure
//import { WritableDraft } from 'immer';

interface MedicationRecord {
  id: string;
  date: string;
  clinic?: string;
  result?: string;
}

interface MedicationRecordsState {
  medicationRecords: MedicationRecord[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MedicationRecordsState = {
  medicationRecords: [],
  status: 'idle',
  error: null,
};

interface RejectWithValue {
  message: string;
}

// Async thunk for adding a medication record
export const addMedicationRecord = createAsyncThunk<MedicationRecord, {
  date: string;
  clinic: string;
  result: string;
}, { rejectValue: RejectWithValue }>(
  'medicationRecords/addMedicationRecord',
  async ({ date, clinic, result }, { rejectWithValue }) => {
    try {
      const data = await addMedication(date, clinic, result);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding medication record:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while adding medication record' });
    }
  }
);

// Async thunk for fetching all medication records
export const GetAllMedicationRecords = createAsyncThunk<MedicationRecord[], void, { rejectValue: RejectWithValue }>(
  'medicationRecords/getAllMedicationRecords',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllMedicationRecords();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching medication records:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while fetching medication records' });
    }
  }
);

// Async thunk for updating a medication record
export const UpdateMedicationRecord = createAsyncThunk<MedicationRecord, {
  date: string;
  clinic: string;
  result: string;
  id: string;
}, { rejectValue: RejectWithValue }>(
  'medicationRecords/updateMedicationRecord',
  async ({ date, clinic, result, id }, { rejectWithValue }) => {
    try {
      const data = await updateMedicationRecord(date, clinic, result, id);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating medication record:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while updating medication record' });
    }
  }
);

// Async thunk for deleting a medication record
export const DeleteMedicationRecord = createAsyncThunk<void, string, { rejectValue: RejectWithValue }>(
  'medicationRecords/deleteMedicationRecord',
  async (medicationId, { rejectWithValue }) => {
    try {
      await deleteMedicationRecord(medicationId);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting medication record:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while deleting medication record' });
    }
  }
);

const medicationRecordsSlice = createSlice({
  name: 'medicationRecords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMedicationRecord.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(addMedicationRecord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.medicationRecords.push(action.payload); // Add new medication record to the array
        state.error = null; // Clear error on success
      })
      .addCase(addMedicationRecord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(GetAllMedicationRecords.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(GetAllMedicationRecords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.medicationRecords = action.payload; // Update with fetched medication records
        state.error = null; // Clear error on success
      })
      .addCase(GetAllMedicationRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(UpdateMedicationRecord.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(UpdateMedicationRecord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, date, clinic, result } = action.payload;
        const existingMedicationIndex = state.medicationRecords.findIndex((record) => record.id === id);
        if (existingMedicationIndex !== -1) {
          state.medicationRecords[existingMedicationIndex] = {
            ...state.medicationRecords[existingMedicationIndex],
            date,
            clinic,
            result,
          };
        }
        state.error = null; // Clear error on success
      })
      .addCase(UpdateMedicationRecord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(DeleteMedicationRecord.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(DeleteMedicationRecord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const medicationId = action.meta.arg;
        state.medicationRecords = state.medicationRecords.filter((record) => record.id !== medicationId);
        state.error = null; // Clear error on success
      })
      .addCase(DeleteMedicationRecord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      });
  },
});

export default medicationRecordsSlice.reducer;

// Selector functions
export const selectMedicationRecords = (state: { medicationRecords: MedicationRecordsState }) => state.medicationRecords.medicationRecords;
export const selectMedicationRecordsStatus = (state: { medicationRecords: MedicationRecordsState }) => state.medicationRecords.status;
export const selectMedicationRecordsError = (state: { medicationRecords: MedicationRecordsState }) => state.medicationRecords.error;
