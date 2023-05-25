import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  videoList: [],
  currentVideo: null,
  editing: {},
  isEditing: false,
  isAdding: false,
};

const videosSlice = createSlice({
  name: "videos",
  initialState,

  reducers: {
    setVideoList: (state, action) => {
      state.videoList = action.payload;
    },
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
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
    clearVideoList: (state) => {
      state.videoList = [];
      state.currentVideo = null;
    },
  },
});

export const {
  chandgeEditStutas,
  editInActive,
  editInInActive,
  chandgeAddingStutas,
  setVideoList,
  setCurrentVideo,
  clearVideoList,
} = videosSlice.actions;
export default videosSlice.reducer;
