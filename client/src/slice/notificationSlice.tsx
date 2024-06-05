// notificationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  notifications: Notification[];
  count: number;
}

interface Notification {
  id: string;
  title: string;
  image: string;
  timestamp: string;
  message: string;
}

const initialState: NotificationState = {
  notifications: [],
  count: 0,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
    },
    updateNotificationCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const { setNotifications, updateNotificationCount } = notificationSlice.actions;

export const selectNotifications = (state: { notifications: NotificationState }) => state.notifications.notifications;

export const selectNotificationById = (notificationId: string) => (state: { notifications: NotificationState }) =>
  state.notifications.notifications.find(n => n.id === notificationId);

export const selectNotificationCount = (state: { notifications: NotificationState }) => state.notifications.count;

export default notificationSlice.reducer;
