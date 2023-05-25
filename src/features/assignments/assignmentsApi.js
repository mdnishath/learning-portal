import { apiSlice } from "../api/apiSlice";
import {
  chandgeAddingStutas,
  chandgeEditStutas,
  editInActive,
} from "./assignmentsSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all assignments
    getAssignments: builder.query({
      query: () => ({
        url: "/assignments",
        method: "GET",
      }),
    }),
    // get single assignment
    getAssignment: builder.query({
      query: (id) => ({
        url: `/assignments/${id}`,
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
    // add  assignment
    addAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          const { data } = res;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                draft.push(data);
              }
            )
          );
          dispatch(chandgeAddingStutas(false));
        } catch (error) {}
      },
    }),

    // Update  assignment
    updateAssignments: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        //console.log(args);
        //Optimastic update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignment",
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
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                const index = draft.findIndex((a) => a.id == data.id);
                draft[index] = data;
              }
            )
          );
          dispatch(chandgeEditStutas(false));
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    // Delete  assignment
    removeAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        //console.log(args);
        const deleteResult = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              // //console.log(JSON.parse(JSON.stringify(draft)));
              // //console.log(draft.filter((v) => v.id != args));
              return draft.filter((a) => a.id != args);
            }
          )
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
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
  useUpdateAssignmentsMutation,
  useRemoveAssignmentMutation,
} = assignmentsApi;
