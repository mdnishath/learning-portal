import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import produce from "immer";
import { AiOutlineClose } from "react-icons/ai";
import { chandgeAddingStutas } from "../../features/assignments/assignmentsSlice";
import { useDispatch } from "react-redux";
import { useAddAssignmentMutation } from "../../features/assignments/assignmentsApi";
import Loader from "../../shared/ui/Loader";
import { useGetVideosQuery } from "../../features/videos/videosApi";

const AddAssignmentModal = () => {
  const dispatch = useDispatch();
  const { isAdding } = useSelector((state) => state.assignments);
  const [formData, setFormData] = useState({
    title: "",
    totalMark: "",
    video_id: null,
    video_title: "",
  });
  //update mutitation

  const resetForm = () => {
    setFormData({
      title: "",
      totalMark: "",
      video_id: "",
      video_title: "",
    });
  };
  const { title, totalMark, video_id, video_title } = formData || {};

  const [addAssignment, { data, isLoading, isError, isSuccess, error }] =
    useAddAssignmentMutation();

  const { data: vidoes } = useGetVideosQuery();

  //Handle modal
  const handleModal = () => {
    dispatch(chandgeAddingStutas());
  };

  const handleAddAssignment = (e) => {
    e.preventDefault();

    addAssignment({
      title,
      totalMark: parseInt(totalMark),
      video_id,
      video_title,
    });
    resetForm();
  };

  //   //console.log(formData);
  return (
    isAdding && (
      <div className="bg-slate-600 bg-opacity-90 w-full absolute top-0 left-0 h-full">
        <div className=" h-full flex items-center justify-center">
          <div className="bg-slate-50 mx-auto p-5 rounded-lg shadow-xl w-4/12 relative">
            <AiOutlineClose
              onClick={handleModal}
              className="cursor-pointer absolute top-2 right-2 text-slate-700 text-xl"
            />
            <h3 className="text-black font-bold text-2xl text-center">
              Add Assignment
            </h3>
            <form className="mt-8 space-y-6 " onSubmit={handleAddAssignment}>
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
                    type="number"
                    required
                    className="login-input  text-black"
                    placeholder="Total Mark"
                    value={totalMark}
                    onChange={(e) =>
                      setFormData(
                        produce(formData, (draft) => {
                          draft.totalMark = e.target.value;
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
              </div>

              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  Add Assignment
                </button>
                {/* {!isLoading && error && <Error message={error?.data} />} */}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddAssignmentModal;
