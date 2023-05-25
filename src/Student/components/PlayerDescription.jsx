import React, { useEffect, useState } from "react";
import { useGetAssignmentsQuery } from "../../features/assignments/assignmentsApi";
import { useGetQuizzesQuery } from "../../features/quizzes/quizzesApi";
import { useDispatch, useSelector } from "react-redux";
import { isAssignmentSelector } from "../../features/assignments/assignmentsSelectors";
import { chandgeIsAssignmentStutas } from "../../features/assignments/assignmentsSlice";
import AssignmentModal from "./AssignmentModal";
import { useGetAssignmentMarksQuery } from "../../features/assignmentMarks/assignmentMarksApi";
import { curentUserSelector } from "../../features/auth/authSeletors";
import { Link } from "react-router-dom";
import { useGetQuizMarksQuery } from "../../features/quizMark/quizMarkApi";

const PlayerDescription = ({ video }) => {
  const { user } = useSelector(curentUserSelector);
  const isAssignment = useSelector(isAssignmentSelector);
  const [relatedAssignment, setRelatedAssignment] = useState({});
  const [relatedQuizzes, setRelatedQuizzes] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isQuizTaken, setIsQuizTaken] = useState(false);
  const dispatch = useDispatch();
  const dateString = video?.createdAt;
  const date = new Date(dateString).toLocaleDateString();

  const { data: assignments } = useGetAssignmentsQuery();
  const { data: quizzes } = useGetQuizzesQuery();
  const { data: marks } = useGetAssignmentMarksQuery();
  const { data: quizeMarks } = useGetQuizMarksQuery();

  // //console.log(marks);
  useEffect(() => {
    if (marks && marks.length > 0) {
      const submitedAssignment = marks.findIndex(
        (m) =>
          m.student_id === user?.id && m.assignment_id === relatedAssignment?.id
      );
      //console.log(submitedAssignment);
      if (submitedAssignment != -1) {
        setIsSubmited(true);
      } else {
        setIsSubmited(false);
      }
    }
  }, [marks, relatedAssignment, user]);
  useEffect(() => {
    if (marks && marks.length > 0) {
      const submitedAssignment = marks.findIndex(
        (m) =>
          m.student_id === user?.id && m.assignment_id === relatedAssignment?.id
      );
      //console.log(submitedAssignment);
      if (submitedAssignment != -1) {
        setIsSubmited(true);
      } else {
        setIsSubmited(false);
      }
    }
  }, [marks, relatedAssignment, user]);

  //console.log(isSubmited, relatedAssignment);

  useEffect(() => {
    if (assignments && assignments.length > 0) {
      const matchedAssignment = assignments.find(
        (a) => a.video_id === video?.id
      );
      setRelatedAssignment(matchedAssignment);
    }
  }, [assignments, video]);
  useEffect(() => {
    if (quizzes && quizzes.length > 0) {
      const matchedQuizzes = quizzes.filter((q) => q.video_id === video?.id);
      setRelatedQuizzes(matchedQuizzes);
    }
  }, [quizzes, video]);

  useEffect(() => {
    //console.log(quizeMarks);
    if (quizeMarks && quizeMarks.length > 0) {
      const matchedQuizMark = quizeMarks.findIndex(
        (q) => q.video_id == video?.id && q.student_id == user?.id
      );
      if (matchedQuizMark != -1) {
        setIsQuizTaken(true);
      } else {
        setIsQuizTaken(false);
      }
    }
  }, [quizeMarks, video]);
  //console.log("Qz taken", isQuizTaken);

  return (
    <div>
      {isAssignment && <AssignmentModal assignment={relatedAssignment} />}
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {video?.title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on {date}
      </h2>

      <div className="flex gap-4">
        {relatedAssignment &&
          Object.keys(relatedAssignment).length > 0 &&
          (isSubmited ? (
            <button
              disabled={isSubmited}
              onClick={() => dispatch(chandgeIsAssignmentStutas(!isAssignment))}
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
              এসাইনমেন্ট জমা দিয়েছেন
            </button>
          ) : (
            <button
              disabled={isSubmited}
              onClick={() => dispatch(chandgeIsAssignmentStutas(!isAssignment))}
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
              এসাইনমেন্ট
            </button>
          ))}

        {relatedQuizzes &&
          relatedQuizzes.length > 0 &&
          (isQuizTaken ? (
            <p
              disabled={isQuizTaken}
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
              কুইজে অংশগ্রহণ করেছেন
            </p>
          ) : (
            <Link
              disabled={isQuizTaken}
              to={`/student/quiz/${video?.id}`}
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
              কুইজে অংশগ্রহণ করুন
            </Link>
          ))}
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">
        {video?.description}
      </p>
    </div>
  );
};

export default PlayerDescription;
