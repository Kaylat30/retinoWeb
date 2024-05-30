import { configureStore } from "@reduxjs/toolkit";
import nutritionSlice from "./slice/nutritionSlice";
import appointmentsSlice from "./slice/appointmentsSlice";
import userSlice from "./slice/userSlice";
import {  useDispatch, useSelector,TypedUseSelectorHook } from 'react-redux';
import blogSlice from "./slice/blogSlice";


export type RootState = ReturnType<typeof store.getState>;
  const store = configureStore({
    reducer: {
      foods: nutritionSlice,
      appointments: appointmentsSlice,
      user: userSlice,
      blogs: blogSlice
    },
    
  });

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;