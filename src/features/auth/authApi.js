import { apiSlice } from "../api/apiSlice";
import { videosApi } from "../videos/videosApi";
import { setCurrentVideo, setVideoList } from "../videos/videosSlice";
import { userLoggedIn } from "./authSlice";

// creating auth api slice using apislice
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Login mutitation
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const result = await queryFulfilled;
          const { user } = result.data;
          //console.log(user);
          if (user?.role === "student") {
            const videos = await dispatch(
              videosApi.endpoints.getVideos.initiate()
            ).unwrap();
            dispatch(setVideoList(videos));
            dispatch(setCurrentVideo(videos[0].id));
          }
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {}
      },
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const result = await queryFulfilled;
          const { user } = result.data;
          //console.log(user);
          if (user?.role === "student") {
            const videos = await dispatch(
              videosApi.endpoints.getVideos.initiate()
            ).unwrap();
            dispatch(setVideoList(videos));
            dispatch(setCurrentVideo(videos[0].id));
          }
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation, useGetUsersQuery, useSignupMutation } =
  authApi;
