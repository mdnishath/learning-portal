import React, { useEffect, useState } from "react";
import { useGetVideoQuery } from "../../features/videos/videosApi";
import { currentVideoSelector } from "../../features/videos/videosSelectors";
import { useSelector } from "react-redux";
import VideoLoader from "../../shared/ui/VideoLoader";
import Error from "../../shared/ui/Error";
import PlayerDescription from "./PlayerDescription";

const Player = () => {
  const currentVideoId = useSelector(currentVideoSelector);
  const [change, SetChange] = useState(false);
  const {
    data: video,
    isLoading,
    isError,
    error,
  } = useGetVideoQuery(currentVideoId, { skip: !change });

  useEffect(() => {
    if (currentVideoId) {
      SetChange(true);
    }
  }, [currentVideoId]);
  //what to show
  let content = null;
  if (isLoading) {
    content = <VideoLoader />;
  } else if (!isLoading && isError) {
    content = <Error message={"Fetch error"} />;
  } else if (!isLoading && !isError && video) {
    content = (
      <>
        <iframe
          width="100%"
          className="aspect-video"
          src={video?.url}
          title={video?.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <PlayerDescription video={video} />
      </>
    );
  }
  return content;
};

export default Player;
