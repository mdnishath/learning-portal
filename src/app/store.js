import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import videosSliceReducer from "../features/videos/videosSlice";
import assignmentsSliceReducer from "../features/assignments/assignmentsSlice";
import quizzesSliceReducer from "../features/quizzes/quizzesSlice";
import assignmentMarksSliceReducer from "../features/assignmentMarks/assignmentMarksSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    videos: videosSliceReducer,
    assignments: assignmentsSliceReducer,
    quizzes: quizzesSliceReducer,
    assignmentMarks: assignmentMarksSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
