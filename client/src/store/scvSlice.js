import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  error: false,
};
export const csvSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    getList: (state, action) => {
      const { list } = action.payload;
      state.list = list;
    },
    setLoader: (state, action) => {
      const { error } = action.payload;
      state.error = error;
    },
  },
});

export const { getList, setLoader } = csvSlice.actions;
export default csvSlice.reducer;
