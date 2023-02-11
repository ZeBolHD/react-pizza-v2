import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state) => {
      state.list.push("задача");
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { decrement, setTask } = taskSlice.actions;

export default taskSlice.reducer;
