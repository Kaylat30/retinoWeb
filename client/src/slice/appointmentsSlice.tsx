import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addAppointment, getAllAppointments, updateAppointment, deleteAppointment } from '../api'; // Adjust imports based on your API structure
//import { WritableDraft } from 'immer';

interface Appointment {
  id: string;
  clinic: string;
  email: string;
  number: number;
  description: string;
  message: string;
  name: string;
  date: string;
  result?: string;
}

interface AppointmentsState {
  appointments: Appointment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AppointmentsState = {
  appointments: [],
  status: 'idle',
  error: null,
};

interface RejectWithValue {
  message: string;
}

// Async thunk for adding an appointment
export const AddAppointment = createAsyncThunk<Appointment, {
  clinic: string,
  email: string,
  number: number,
  description: string,
  message: string,
  name: string,
  date: string
}, { rejectValue: RejectWithValue }>(
  'appointments/addAppointment',
  async ({ clinic, email, number, description, message, name, date }, { rejectWithValue }) => {
    try {
      const data = await addAppointment(clinic, email, number, description, message, name, date);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding appointment:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while adding appointment' });
    }
  }
);

// Async thunk for fetching all appointments
export const GetAllAppointments = createAsyncThunk<Appointment[], void, { rejectValue: RejectWithValue }>(
  'appointments/getAllAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllAppointments();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching appointments:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while fetching appointments' });
    }
  }
);

// Async thunk for updating an appointment
export const UpdateAppointment = createAsyncThunk<Appointment, { id: string, result: string }, { rejectValue: RejectWithValue }>(
  'appointments/updateAppointment',
  async ({ id, result }, { rejectWithValue }) => {
    try {
      const data = await updateAppointment(id, result);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating appointment:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while updating appointment' });
    }
  }
);

// Async thunk for deleting an appointment
export const DeleteAppointment = createAsyncThunk<void, string, { rejectValue: RejectWithValue }>(
  'appointments/deleteAppointment',
  async (appointmentId, { rejectWithValue }) => {
    try {
      await deleteAppointment(appointmentId);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting appointment:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while deleting appointment' });
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddAppointment.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(AddAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments.push(action.payload); // Add new appointment to the array
        state.error = null; // Clear error on success
      })
      .addCase(AddAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(GetAllAppointments.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(GetAllAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload; // Update with fetched appointments
        state.error = null; // Clear error on success
      })
      .addCase(GetAllAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(UpdateAppointment.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(UpdateAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, result } = action.payload;
        const existingAppointmentIndex = state.appointments.findIndex((appointment) => appointment.id === id);
        if (existingAppointmentIndex !== -1) {
          state.appointments[existingAppointmentIndex] = { ...state.appointments[existingAppointmentIndex], result };
        }
        state.error = null; // Clear error on success
      })
      .addCase(UpdateAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(DeleteAppointment.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(DeleteAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const appointmentId = action.meta.arg;
        state.appointments = state.appointments.filter((appointment) => appointment.id !== appointmentId);
        state.error = null; // Clear error on success
      })
      .addCase(DeleteAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      });
  },
});

export default appointmentsSlice.reducer;

// Selector functions
export const selectAppointments = (state: { appointments: AppointmentsState }) => state.appointments.appointments;
export const selectAppointmentsStatus = (state: { appointments: AppointmentsState }) => state.appointments.status;
export const selectAppointmentsError = (state: { appointments: AppointmentsState }) => state.appointments.error;
