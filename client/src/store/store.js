import { configureStore } from "@reduxjs/toolkit";
import csvReducer from "./scvSlice";

export const store = configureStore({
  reducer: {
    csvList: csvReducer,
  },
});
