import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import produce from "immer";
import { AiOutlineClose } from "react-icons/ai";
import { chandgeAddingStutas } from "../../features/quizzes/quizzesSlice";
import { useDispatch } from "react-redux";
import { useAddQuizzeMutation } from "../../features/quizzes/quizzesApi";
import Loader from "../../shared/ui/Loader";
import { useGetVideosQuery } from "../../features/videos/videosApi";

const AddQuizzeModal = () => {
  const dispatch = useDispatch();
  const { isAdding } = useSelector((state) => state.quizzes);
  //Form local state
  const [formData, setFormData] = useState({
    question: "",
    video_id: null,
    video_title: "",
    options: [
      { id: 1, option: "", isCorrect: false },
      { id: 2, option: "", isCorrect: false },
      { id: 3, option: "", isCorrect: false },
      { id: 4, option: "", isCorrect: false },
    ],
  });
  const resetForm = () => {
    setFormData({
      question: "",
      video_id: null,
      video_title: "",
      options: [
        { id: 1, option: "", isCorrect: false },
        { id: 2, option: "", isCorrect: false },
        { id: 3, option: "", isCorrect: false },
        { id: 4, option: "", isCorrect: false },
      ],
    });
  };

  // //console.log(formData);
  //dist obj
  const { question, video_id, video_title, options } = formData || {};

  const [addQuizze, { data, isLoading, isError, isSuccess, error }] =
    useAddQuizzeMutation();
  const { data: vidoes } = useGetVideosQuery();

  //Handle modal
  const handleModal = () => {
    dispatch(chandgeAddingStutas());
  };

  const handleAddAssignment = (e) => {
    e.preventDefault();
    // //console.log(formData);
    addQuizze(formData);
    resetForm();
  };

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
              Add Quize
            </h3>

            <form className="mt-8 space-y-6 " onSubmit={handleAddAssignment}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="question" className="sr-only">
                    Question
                  </label>
                  <input
                    id="question"
                    name="question" // Updated name attribute
                    type="text"
                    required
                    className="login-input rounded-t-md text-black"
                    placeholder="Add question"
                    value={question}
                    onChange={(e) =>
                      setFormData(
                        produce(formData, (draft) => {
                          draft.question = e.target.value;
                        })
                      )
                    }
                  />
                </div>

                <div>
                  <label htmlFor="video_title" className="sr-only">
                    Select video
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
                    className="w-full text-slate-700 rounded-b-md"
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
              {/* Question options 1 start */}
              <div className="flex flex-col md:flex-row md:justify-between items-center md:space-x-4 space-y-2 md:space-y-0 text-slate-700">
                <label htmlFor="option1" className="font-semibold">
                  Option 1:
                </label>
                <input
                  value={options?.[0].option}
                  onChange={(e) =>
                    setFormData(
                      produce(formData, (draft) => {
                        draft.options[0].option = e.target.value;
                      })
                    )
                  }
                  type="text"
                  id="option1"
                  name="option1"
                  required
                  className="w-full md:w-3/6 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <label htmlFor="isCorrect1" className="font-semibold">
                  Is Correct:
                </label>
                <input
                  checked={options?.[0].isCorrect}
                  onChange={(e) =>
                    setFormData(
                      produce(formData, (draft) => {
                        draft.options[0].isCorrect = e.target.checked;
                      })
                    )
                  }
                  type="checkbox"
                  id="isCorrect1"
                  name="isCorrect1"
                  className="h-4 w-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Question options 1 end */}
              {/* Question options 2 start */}
              <div className="flex flex-col md:flex-row md:justify-between items-center md:space-x-4 space-y-2 md:space-y-0 text-slate-700">
                <label htmlFor="option2" className="font-semibold">
                  Option 2:
                </label>
                <input
                  value={options?.[1].option}
                  onChange={(e) =>
                    setFormData(
                      produce(formData, (draft) => {
                        draft.options[1].option = e.target.value;
                      })
                    )
                  }
                  type="text"
                  id="option2"
                  name="option2"
                  required
                  className="w-full md:w-3/6 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <label htmlFor="isCorrect1" className="font-semibold">
                  Is Correct:
                </label>
                <input
                  checked={options?.[1].isCorrect}
                  onChange={(e) =>
                    setFormData(
                      produce(formData, (draft) => {
                        draft.options[1].isCorrect = e.target.checked;
                      })
                    )
                  }
                  type="checkbox"
                  id="isCorrect2"
                  name="isCorrect2"
                  className="h-4 w-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Question options 2 end */}
              {/* Question options 3 start */}
              <div className="flex flex-col md:flex-row md:justify-between items-center md:space-x-4 space-y-2 md:space-y-0 text-slate-700">
                <label htmlFor="option3" className="font-semibold">
                  Option 3:
                </label>
                <input
                  value={options?.[2].option}
                  onChange={(e) =>
                    setFormData(
                      produce(formData, (draft) => {
                        draft.options[2].option = e.target.value;
                      })
                    )
                  }
                  type="text"
                  id="option3"
                  name="option3"
                  required
                  className="w-full md:w-3/6 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <label htmlFor="isCorrect1" className="font-semibold">
                  Is Correct:
                </label>
                <input
                  checked={options?.[2].isCorrect}
                  onChange={(e) =>
                    setFormData(
                      produce(formData, (draft) => {
                        draft.options[2].isCorrect = e.target.checked;
                      })
                    )
                  }
                  type="checkbox"
                  id="isCorrect3"
                  name="isCorrect3"
                  className="h-4 w-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Question options 3 end */}
              {/* Question options 4 start */}
              <div className="flex flex-col md:flex-row md:justify-between items-center md:space-x-4 space-y-2 md:space-y-0 text-slate-700">
                <label htmlFor="option4" className="font-semibold">
                  Option 4:
                </label>
                <input
                  value={options?.[3].option}
                  onChange={(e) =>
                    setFormData(
                      produce(formData, (draft) => {
                        draft.options[3].option = e.target.value;
                      })
                    )
                  }
                  type="text"
                  id="option4"
                  name="option4"
                  required
                  className="w-full md:w-3/6 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <label htmlFor="isCorrect1" className="font-semibold">
                  Is Correct:
                </label>
                <input
                  checked={options?.[3].isCorrect}
                  onChange={(e) =>
                    setFormData(
                      produce(formData, (draft) => {
                        draft.options[3].isCorrect = e.target.checked;
                      })
                    )
                  }
                  type="checkbox"
                  id="isCorrect4"
                  name="isCorrect4"
                  className="h-4 w-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Question options 4 end */}

              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  Add quiz
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

export default AddQuizzeModal;
