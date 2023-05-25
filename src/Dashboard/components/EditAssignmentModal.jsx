import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import produce from "immer";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  useUpdateAssignmentsMutation,
  useGetAssignmentQuery,
} from "../../features/assignments/assignmentsApi";
import Loader from "../../shared/ui/Loader";
import {
  chandgeEditStutas,
  editInInActive,
} from "../../features/assignments/assignmentsSlice";
import { useGetVideosQuery } from "../../features/videos/videosApi";

const EditAssignmentModal = ({ assignmentId }) => {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);

  const { editing, isEditing } = useSelector((state) => state.assignments);
  const [formData, setFormData] = useState({
    title: "",
    totalMark: 0,
    video_id: null,
    video_title: "",
  });
  //update mutitation
  const [
    updateAssignments,
    {
      isLoadin: isLoadingUpdate,
      isSuccess: isScuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
    },
  ] = useUpdateAssignmentsMutation();
  const resetForm = () => {
    setFormData({
      title: "",
      totalMark: "",
      video_id: "",
      video_title: "",
    });
  };
  const { title, totalMark, video_id, video_title } = formData || {};
  const {
    data: assignment,
    isLoading,
    isError,
    isSuccess,
  } = useGetAssignmentQuery(assignmentId, {
    skip: !change,
  });

  const { data: vidoes } = useGetVideosQuery();

  //Handle modal
  const handleModal = () => {
    dispatch(chandgeEditStutas());
    dispatch(editInInActive());
  };

  useEffect(() => {
    if (assignmentId) {
      setChange(true);
    }
  }, [assignmentId]);

  useEffect(() => {
    if (assignment && Object.keys(assignment).length > 0) {
      setFormData({
        title: assignment.title,
        totalMark: parseInt(assignment.totalMark),
        video_id: assignment.video_id,
        video_title: assignment.video_title,
      });
    }
  }, [assignment]);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateAssignments({
      id: assignmentId,
      data: formData,
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
  } else if (
    !isLoading &&
    !isError &&
    assignment &&
    Object.keys(assignment).length > 0
  ) {
    content = (
      <form className="mt-8 space-y-6 " onSubmit={handleUpdate}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="title" className="sr-only">
              Assignment Title
            </label>
            <input
              id="title"
              name="title" // Updated name attribute
              type="text"
              required
              className="login-input rounded-t-md text-black"
              placeholder="Assignment title"
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
            <label htmlFor="totalMark" className="sr-only">
              Total Mark
            </label>
            <input
              id="totalMark"
              name="totalMark"
              type="text"
              required
              className="login-input  text-black"
              placeholder="Total Mark"
              value={totalMark}
              onChange={(e) =>
                setFormData(
                  produce(formData, (draft) => {
                    draft.totalMark = parseInt(e.target.value);
                  })
                )
              }
            />
          </div>
          <div>
            <label htmlFor="video_title" className="sr-only">
              Video url
            </label>
            <select
              value={video_title}
              onChange={(e) => {
                const selectedVideo = vidoes.find(
                  (video) => video.title === e.target.value
                );
                setFormData(
                  produce(formData, (draft) => {
                    draft.video_title = e.target.value;
                    draft.video_id = selectedVideo.id;
                  })
                );
              }}
              name="video_title"
              className="w-full text-slate-700"
              required
            >
              {/* selected */}
              <option value="" hidden>
                Select Video
              </option>
              {vidoes &&
                vidoes.map((video) => (
                  <option key={video.id} value={video.title}>
                    {video.title}
                  </option>
                ))}
            </select>
          </div>
          {/* <div>
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
          </div> */}
          {/* <div>
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
          </div> */}
        </div>

        <div>
          <button
            disabled={isLoadingUpdate}
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
              Assignment Editing
            </h3>
            {content}
          </div>
        </div>
      </div>
    )
  );
};

export default EditAssignmentModal;
