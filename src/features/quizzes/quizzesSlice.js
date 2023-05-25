import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  editing: {},
  isEditing: false,
  isAdding: false,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,

  reducers: {
    chandgeEditStutas: (state) => {
      state.isEditing = !state.isEditing;
    },
    chandgeAddingStutas: (state) => {
      state.isAdding = !state.isAdding;
    },
    editInActive: (state, action) => {
      state.editing = action.payload;
    },
    editInInActive: (state) => {
      state.editing = {};
    },
  },
});

export const {
  chandgeEditStutas,
  editInActive,
  editInInActive,
  chandgeAddingStutas,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
