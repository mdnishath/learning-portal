import { apiSlice } from "../api/apiSlice";
import {
  chandgeAddingStutas,
  chandgeEditStutas,
  editInActive,
} from "./quizzesSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all Quizzes
    getQuizzes: builder.query({
      query: () => ({
        url: "/quizzes",
        method: "GET",
      }),
    }),
    // get single Quizze
    getQuizze: builder.query({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "GET",
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          const { data } = res;
          dispatch(editInActive(data));
        } catch (error) {}
      },
    }),
    // add  Quizze
    addQuizze: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          const { data } = res;
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              draft.push(data);
            })
          );
          dispatch(chandgeAddingStutas(false));
        } catch (error) {}
      },
    }),

    // Update  Quizze
    updateQuizzes: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        //Optimastic update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getQuizze",
            args.id.toString(),
            (draft) => {
              //console.log(draft);
              Object.assign(draft, args.data);
            }
          )
        );
        try {
          const res = await queryFulfilled;
          const { data } = res;
          //pasimestic update
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              const index = draft.findIndex((q) => q.id == data.id);
              draft[index] = data;
            })
          );
          dispatch(chandgeEditStutas(false));
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    // delete  Quizze
    removeQuizze: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        //console.log(args);
        const deleteResult = dispatch(
          apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
            // //console.log(JSON.parse(JSON.stringify(draft)));
            // //console.log(draft.filter((v) => v.id != args));
            return draft.filter((a) => a.id != args);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          deleteResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetQuizzeQuery,
  useGetQuizzesQuery,
  useAddQuizzeMutation,
  useUpdateQuizzesMutation,
  useRemoveQuizzeMutation,
} = quizzesApi;
