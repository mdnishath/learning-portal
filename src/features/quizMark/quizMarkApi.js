import { apiSlice } from "../api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all Quiz mark
    getQuizMarks: builder.query({
      query: () => ({
        url: "/quizMark",
        method: "GET",
      }),
    }),
    //Submit
    submitQuzizMark: builder.mutation({
      query: (data) => ({
        url: `/quizMark`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          const { data } = res;
          dispatch(
            apiSlice.util.updateQueryData(
              "getQuizMarks",
              undefined,
              (draft) => {
                draft.push(data);
              }
            )
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useSubmitQuzizMarkMutation, useGetQuizMarksQuery } = quizMarkApi;
