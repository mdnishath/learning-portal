import React from "react";
import Layout from "../../shared/components/Layout";
import VideoTable from "../components/VideoTable";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import Loader from "../../shared/ui/Loader";
import Error from "../../shared/ui/Error";
import AddVideoModal from "../components/AddVideoModal";
import { useDispatch } from "react-redux";
import { chandgeAddingStutas } from "../../features/videos/videosSlice";

const Videos = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useGetVideosQuery();

  // what to show
  let content = null;
  if (isLoading) {
    content = (
      <div className="grid grid-cols-4">
        <Loader />
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  } else if (!isLoading && isError) {
    content = <Error message={"Error hapend when fetcing videos"} />;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <Error message={"No Videos found"} />;
  } else if (!isLoading && !isError && data?.length > 0) {
    content = <VideoTable Videos={data} />;
  }

  return (
    <>
      <AddVideoModal />
      <Layout>
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
              <div className="w-full flex">
                <button
                  onClick={() => dispatch(chandgeAddingStutas())}
                  className="btn ml-auto"
                >
                  Add Video
                </button>
              </div>
              <div className="overflow-x-auto mt-4">
                {content}
                {/* <VideoTable /> */}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Videos;
