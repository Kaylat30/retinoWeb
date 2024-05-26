import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Appointment {
  id: string;
  // Define other fields for appointment
}

interface AppointmentsState {
  appointments: Appointment[];
}

const initialState: AppointmentsState = {
  appointments: [],
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment(state, action: PayloadAction<Appointment>) {
      state.appointments.push(action.payload);
    },
    getAllAppointments(state, action: PayloadAction<Appointment[]>) {
      state.appointments = action.payload;
    },
    // Define other reducers as needed
  },
});

export const { addAppointment, getAllAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
