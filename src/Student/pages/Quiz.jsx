import React, { useState } from "react";
import Layout from "../../shared/components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useGetQuizzesQuery } from "../../features/quizzes/quizzesApi";
import { useGetVideoQuery } from "../../features/videos/videosApi";
import produce from "immer";
import { checkSelectedAnswers } from "../../utils/checkSelectedAnswers ";
import { useDispatch, useSelector } from "react-redux";
import { quizMarkApi } from "../../features/quizMark/quizMarkApi";
import { curentUserSelector } from "../../features/auth/authSeletors";

const Quiz = () => {
  const navigate = useNavigate();
  const { user } = useSelector(curentUserSelector);
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { data: video } = useGetVideoQuery(videoId);
  const { data: quizzes } = useGetQuizzesQuery();
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (quizId, optionId, checked) => {
    setAnswers(
      produce(answers, (draft) => {
        if (!draft[quizId]) {
          draft[quizId] = [];
        }

        if (checked) {
          draft[quizId].push(optionId);
        } else {
          const index = draft[quizId].indexOf(optionId);
          if (index !== -1) {
            draft[quizId].splice(index, 1);
          }
        }
      })
    );
  };
  const relatedQuizzes = quizzes?.filter(
    (quiz) => quiz.video_id.toString() === videoId
  );

  const handleSubmit = () => {
    // //console.log("User answers:", answers);
    const totalCorrect = checkSelectedAnswers(relatedQuizzes, answers);
    const totalWrong = relatedQuizzes.length - totalCorrect;
    const totalMark = totalCorrect * 5;

    dispatch(
      quizMarkApi.endpoints.submitQuzizMark.initiate({
        student_id: user.id,
        student_name: user.name,
        video_id: parseInt(videoId),
        video_title: video?.title,
        totalQuiz: relatedQuizzes.length,
        totalCorrect,
        totalWrong,
        totalMark: relatedQuizzes.length * 5,
        mark: totalMark,
      })
    );
    navigate("/");
  };

  return (
    <Layout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Quizzes for "{video?.title}"</h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8">
            {relatedQuizzes?.map((quiz) => (
              <div key={quiz.id} className="quiz">
                <h4 className="question">
                  Quiz {quiz.id} - {quiz.question}
                </h4>
                <form className="quizOptions">
                  {quiz.options.map((option) => (
                    <label
                      key={option.id}
                      htmlFor={`option${option.id}_q${quiz.id}`}
                    >
                      <input
                        type="checkbox"
                        id={`option${option.id}_q${quiz.id}`}
                        onChange={(e) =>
                          handleAnswerChange(
                            quiz.id,
                            option.id,
                            e.target.checked
                          )
                        }
                      />
                      {option.option}
                    </label>
                  ))}
                </form>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
          >
            Submit
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Quiz;
