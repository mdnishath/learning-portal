import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  assignments: [],
  editing: {},
  isEditing: false,
  isAdding: false,
  isAssignment: false,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,

  reducers: {
    chandgeEditStutas: (state) => {
      state.isEditing = !state.isEditing;
    },
    chandgeAddingStutas: (state) => {
      state.isAdding = !state.isAdding;
    },
    chandgeIsAssignmentStutas: (state) => {
      state.isAssignment = !state.isAssignment;
    },
    editInActive: (state, action) => {
      state.editing = action.payload;
    },
    editInInActive: (state) => {
      state.editing = {};
    },
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
  },
});

export const {
  chandgeEditStutas,
  editInActive,
  editInInActive,
  chandgeAddingStutas,
  chandgeIsAssignmentStutas,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
