import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    task: taskSlice,
  },
});
