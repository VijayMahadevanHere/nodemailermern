import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalslice';
export const store = configureStore({
  reducer: {
    auth:authReducer,
    goal:goalReducer
  }
})
