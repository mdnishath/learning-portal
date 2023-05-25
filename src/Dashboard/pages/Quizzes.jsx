import React from "react";
import Layout from "../../shared/components/Layout";
import QuizTable from "../components/QuizTable";
import { useGetQuizzesQuery } from "../../features/quizzes/quizzesApi";
import Loader from "../../shared/ui/Loader";
import Error from "../../shared/ui/Error";
import AddQuizzeModal from "../components/AddQuizzeModal";
import { useDispatch } from "react-redux";
import { chandgeAddingStutas } from "../../features/quizzes/quizzesSlice";

const Quizzes = () => {
  const dispatch = useDispatch();
  const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();
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
  } else if (!isLoading && !isError && quizzes?.length === 0) {
    content = <Error message={"No Quizzes found"} />;
  } else if (!isLoading && !isError && quizzes?.length > 0) {
    content = <QuizTable quizzes={quizzes} />;
  }

  return (
    <>
      <AddQuizzeModal />
      <Layout>
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
              <div className="w-full flex">
                <button
                  onClick={() => dispatch(chandgeAddingStutas())}
                  className="btn ml-auto"
                >
                  Add Quiz
                </button>
              </div>
              <div className="overflow-x-auto mt-4">{content}</div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Quizzes;
