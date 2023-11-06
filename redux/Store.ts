import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./Slice";

export const store = configureStore({
  reducer: {
    data: counterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
