import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { assignmentMarksApi } from "../../features/assignmentMarks/assignmentMarksApi";
import { curentUserSelector } from "../../features/auth/authSeletors";
import { chandgeIsAssignmentStutas } from "../../features/assignments/assignmentsSlice";

const AssignmentModal = ({ assignment }) => {
  const { user } = useSelector(curentUserSelector);
  //console.log(user);
  const dispatch = useDispatch();
  const { id, title, totalMark } = assignment || {};
  const [submitData, setSubmitData] = useState("");

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const currentDateTimeString = currentDate.toLocaleString();
    dispatch(
      assignmentMarksApi.endpoints.submitAssignment.initiate({
        student_id: user?.id,
        student_name: user?.name,
        assignment_id: id,
        title,
        createdAt: currentDateTimeString,
        totalMark,
        mark: 0,
        repo_link: submitData,
        status: "pending",
      })
    );
    //console.log("assignment submited");
  };

  //handle close modal
  const handleModal = () => {
    dispatch(chandgeIsAssignmentStutas(false));
  };

  //console.log(submitData);
  return (
    <div className="bg-slate-600 bg-opacity-90 w-full absolute top-0 left-0 h-full">
      <div className=" h-full flex items-center justify-center">
        <div className="bg-slate-50 mx-auto p-5 rounded-lg shadow-xl w-4/12 relative">
          <AiOutlineClose
            onClick={handleModal}
            className="cursor-pointer absolute top-2 right-2 text-slate-700 text-xl"
          />
          <h3 className="text-black font-bold text-2xl text-center">
            Submit Assignment
          </h3>
          <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
                >
                  Assignment Data
                </label>
                <textarea
                  value={submitData}
                  id="assignment"
                  name="assignment"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  onChange={(e) => setSubmitData(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Submit
              </button>
              {/* {!isLoading && error && <Error message={error?.data} />} */}
            </div>
          </form>
          <h3 className="text-slate-700 text-xl font-bold mt-4">{title}</h3>
          <p className="text-slate-700 text-xl font-bold mt-4">
            Total Mark : {totalMark}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
