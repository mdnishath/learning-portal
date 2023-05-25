import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  stutas: "total",
};

const assignmentMarksSlice = createSlice({
  name: "assignmentMarks",
  initialState,

  reducers: {
    changeFilter: (state, action) => {
      state.stutas = action.payload;
    },
  },
});

export const { changeFilter } = assignmentMarksSlice.actions;
export default assignmentMarksSlice.reducer;
