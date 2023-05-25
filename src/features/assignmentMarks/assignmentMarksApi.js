import { apiSlice } from "../api/apiSlice";
import { chandgeIsAssignmentStutas } from "../assignments/assignmentsSlice";

export const assignmentMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all assignments
    getAssignmentMarks: builder.query({
      query: () => ({
        url: "/assignmentMark",
        method: "GET",
      }),
    }),
    //Submit
    submitAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          const { data } = res;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentMarks",
              undefined,
              (draft) => {
                draft.push(data);
              }
            )
          );
          dispatch(chandgeIsAssignmentStutas(false));
        } catch (error) {}
      },
    }),
    //Update
    updateMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          const { data } = res;
          // //console.log(data);
          //pasimestic update
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentMarks",
              undefined,
              (draft) => {
                // //console.log(JSON.parse(JSON.stringify(draft)));
                const index = draft.findIndex((m) => m.id == data.id);
                draft[index] = data;
              }
            )
          );
        } catch (error) {
          // patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetAssignmentMarksQuery, useUpdateMarkMutation } =
  assignmentMarksApi;
