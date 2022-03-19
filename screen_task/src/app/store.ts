import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/screen/userSlice";

export const store = configureStore({
  reducer: {
    data: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
