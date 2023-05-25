import { apiSlice } from "../api/apiSlice";
import videosSlice, {
  chandgeAddingStutas,
  chandgeEditStutas,
  editInActive,
  setCurrentVideo,
  setVideoList,
} from "./videosSlice";

// creating auth api slice using apislice
export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //get videos
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
        method: "GET",
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          const { data } = res;
          dispatch(setVideoList(data));
          dispatch(setCurrentVideo(data[0].id));
        } catch (error) {}
      },
    }),
    //get video
    getVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
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
    addVideo: builder.mutation({
      query: (data) => {
        // //console.log(data);
        return {
          url: "/videos",
          method: "POST",
          body: data,
        };
      },
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          const { data } = res;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              draft.push(data);
            })
          );
          dispatch(chandgeAddingStutas(false));
        } catch (error) {}
      },
    }),

    //update video
    updateVideos: builder.mutation({
      query: ({ id, data }) => {
        // //console.log("From videoApi", id, data);
        return {
          url: `/videos/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        //Optimastic update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getVideo",
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
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              const index = draft.findIndex((v) => v.id == data.id);
              draft[index] = data;
            })
          );
          dispatch(chandgeEditStutas(false));
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    //Delete video
    removeVideo: builder.mutation({
      query: (id) => {
        return {
          url: `/videos/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        //console.log(args);

        // Find and delete related assignments
        const assignments = await dispatch(
          apiSlice.endpoints.getAssignments.initiate()
        );
        const relatedAssignments = assignments.data.filter(
          (a) => a.video_id === args
        );
        relatedAssignments.forEach(async (assignment) => {
          await dispatch(
            apiSlice.endpoints.removeAssignment.initiate(assignment.id)
          );
        });

        // Find and delete related quizzes
        const quizzes = await dispatch(
          apiSlice.endpoints.getQuizzes.initiate()
        );
        const relatedQuizzes = quizzes.data.filter((q) => q.video_id === args);
        relatedQuizzes.forEach(async (quiz) => {
          await dispatch(apiSlice.endpoints.removeQuizze.initiate(quiz.id));
        });
        const deleteResult = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
            // //console.log(JSON.parse(JSON.stringify(draft)));
            // //console.log(draft.filter((v) => v.id != args));
            return draft.filter((v) => v.id != args);
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
  useGetVideosQuery,
  useGetVideoQuery,
  useUpdateVideosMutation,
  useRemoveVideoMutation,
  useAddVideoMutation,
} = videosApi;
