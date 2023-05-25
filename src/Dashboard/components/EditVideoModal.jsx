import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import produce from "immer";
import { AiOutlineClose } from "react-icons/ai";
import {
  chandgeEditStutas,
  editInInActive,
} from "../../features/videos/videosSlice";
import { useDispatch } from "react-redux";
import {
  useGetVideoQuery,
  useUpdateVideosMutation,
  videosApi,
} from "../../features/videos/videosApi";
import Loader from "../../shared/ui/Loader";
import { useNavigate } from "react-router-dom";

const EditVideoModal = ({ videoId }) => {
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const { editing, isEditing } = useSelector((state) => state.videos);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    views: "",
    duration: "",
  });
  //update mutitation

  const [
    updateVideos,
    {
      data,
      isLoadin: isLoadingUpdate,
      isSuccess: isScuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
    },
  ] = useUpdateVideosMutation();
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      url: "",
      views: "",
      duration: "",
    });
  };
  const { title, description, url, views, duration } = formData || {};
  const {
    data: video,
    isLoading,
    isError,
    isSuccess,
  } = useGetVideoQuery(videoId, {
    skip: !change,
  });

  //Handle modal
  const handleModal = () => {
    dispatch(chandgeEditStutas());
    dispatch(editInInActive());
  };

  useEffect(() => {
    if (videoId) {
      setChange(true);
    }
  }, [videoId]);

  useEffect(() => {
    if (video && Object.keys(video).length > 0) {
      setFormData({
        title: video.title,
        description: video.description,
        url: video.url,
        views: video.views,
        duration: video.duration,
      });
    }
  }, [video]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const currentDateTimeString = currentDate.toLocaleString();
    updateVideos({
      id: videoId,
      data: {
        title,
        description,
        url,
        views,
        duration,
        createdAt: currentDateTimeString,
      },
    });
  };

  let content = null;
  if (isLoading) {
    content = (
      <div className="flex justify-center my-3">
        <Loader />;
        <Loader />;
      </div>
    );
  } else if (!isLoading && !isError && video && Object.keys(video).length > 0) {
    content = (
      <form className="mt-8 space-y-6 " onSubmit={handleUpdate}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="title" className="sr-only">
              Video Title
            </label>
            <input
              id="title"
              name="title" // Updated name attribute
              type="text"
              required
              className="login-input rounded-t-md text-black"
              placeholder="Video title"
              value={title}
              onChange={(e) =>
                setFormData(
                  produce(formData, (draft) => {
                    draft.title = e.target.value;
                  })
                )
              }
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Video description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              required
              className="login-input  text-black"
              placeholder="Video description"
              value={description}
              onChange={(e) =>
                setFormData(
                  produce(formData, (draft) => {
                    draft.description = e.target.value;
                  })
                )
              }
            />
          </div>
          <div>
            <label htmlFor="url" className="sr-only">
              Video url
            </label>
            <input
              id="url"
              name="url"
              type="text"
              required
              className="login-input  text-black"
              placeholder="Video url"
              value={url}
              onChange={(e) =>
                setFormData(
                  produce(formData, (draft) => {
                    draft.url = e.target.value;
                  })
                )
              }
            />
          </div>
          <div>
            <label htmlFor="views" className="sr-only">
              Video Views
            </label>
            <input
              id="views"
              name="views"
              type="text"
              required
              className="login-input  text-black"
              placeholder="Video views"
              value={views}
              onChange={(e) =>
                setFormData(
                  produce(formData, (draft) => {
                    draft.views = e.target.value;
                  })
                )
              }
            />
          </div>
          <div>
            <label htmlFor="duration" className="sr-only">
              Video durations
            </label>
            <input
              id="duration"
              name="duration"
              type="text"
              required
              className="login-input rounded-b-md text-black"
              placeholder="Video durations"
              value={duration}
              onChange={(e) =>
                setFormData(
                  produce(formData, (draft) => {
                    draft.duration = e.target.value;
                  })
                )
              }
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Update
          </button>
          {/* {!isLoading && error && <Error message={error?.data} />} */}
        </div>
      </form>
    );
  }
  //   //console.log(formData);
  return (
    isEditing && (
      <div className="bg-slate-600 bg-opacity-90 w-full absolute top-0 left-0 h-full">
        <div className=" h-full flex items-center justify-center">
          <div className="bg-slate-50 mx-auto p-5 rounded-lg shadow-xl w-4/12 relative">
            <AiOutlineClose
              onClick={handleModal}
              className="cursor-pointer absolute top-2 right-2 text-slate-700 text-xl"
            />
            <h3 className="text-black font-bold text-2xl text-center">
              Video Editing
            </h3>
            {content}
          </div>
        </div>
      </div>
    )
  );
};

export default EditVideoModal;
