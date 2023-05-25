import React from "react";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import Loader from "../../shared/ui/Loader";
import Error from "../../shared/ui/Error";
import { useDispatch, useSelector } from "react-redux";
import { curentUserSelector } from "../../features/auth/authSeletors";
import { currentVideoSelector } from "../../features/videos/videosSelectors";
import { setCurrentVideo } from "../../features/videos/videosSlice";

const VideoList = () => {
  const dispatch = useDispatch();
  const currentVideoId = useSelector(currentVideoSelector);
  const { data: videos, isLoading, iseError, error } = useGetVideosQuery();

  //What to show
  let content = null;

  //console.log("currentVideo", currentVideoId);
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && iseError) {
    content = <Error message={"Videos feccing issue"} />;
  } else if (!isLoading && !iseError && videos?.length === 0) {
    content = <Error message={"No Videos found"} />;
  } else if (!isLoading && !iseError && videos?.length > 0) {
    content = videos.map((video) => (
      <div
        onClick={() => dispatch(setCurrentVideo(video.id))}
        key={video.id}
        className={`w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 py-3 ${
          currentVideoId === video.id && "bg-slate-900"
        }`}
      >
        {/* <!-- Thumbnail --> */}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
          />
        </svg>
        {/* <!-- Description --> */}
        <div clas="flex flex-col w-full">
          <p className="text-slate-50 text-sm font-medium">{video?.title}</p>

          <div>
            <span className="text-gray-400 text-xs mt-1">
              {video?.duration} Mins
            </span>
            <span className="text-gray-400 text-xs mt-1"> | </span>
            <span className="text-gray-400 text-xs mt-1">
              {video?.views} views
            </span>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
};

export default VideoList;
