import React, { useEffect, useState } from "react";
import Layout from "../../shared/components/Layout";
import { useSelector } from "react-redux";
import { curentUserSelector } from "../../features/auth/authSeletors";
import { useGetAssignmentMarksQuery } from "../../features/assignmentMarks/assignmentMarksApi";
import { useGetQuizMarksQuery } from "../../features/quizMark/quizMarkApi";
import { combineResults } from "../../utils/combineResults";

const Leaderboard = () => {
  const { user } = useSelector(curentUserSelector);
  const { data: assignMentMarks } = useGetAssignmentMarksQuery();
  const { data: quizMarks } = useGetQuizMarksQuery();
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    if (
      user &&
      assignMentMarks &&
      assignMentMarks?.length > 0 &&
      quizMarks &&
      quizMarks?.length
    ) {
      const studentsRanking = combineResults(assignMentMarks, quizMarks);
      setRankings(studentsRanking);
    }
  }, [user, assignMentMarks, quizMarks]);

  console.log(rankings);
  const curentUserRanking = rankings.find(
    (student) => student.student_id === user.id
  );
  const { ranking, student_name, assignmentsMark, quizzesMark, totalMark } =
    curentUserRanking || {};
  const top20StudentRankings = rankings.slice(0, 20);
  // console.log(top20StudentRankings);
  // console.log(user);
  let content = null;
  if (rankings && rankings.length > 0) {
    content = (
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">
                    {curentUserRanking ? ranking : 0}
                  </td>
                  <td className="table-td text-center font-bold">
                    {curentUserRanking ? student_name : user.name}
                  </td>
                  <td className="table-td text-center font-bold">
                    {curentUserRanking ? quizzesMark : 0}
                  </td>
                  <td className="table-td text-center font-bold">
                    {curentUserRanking ? assignmentsMark : 0}
                  </td>
                  <td className="table-td text-center font-bold">
                    {curentUserRanking ? totalMark : 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                {top20StudentRankings.map((rank) => (
                  <tr
                    key={rank.student_id}
                    className="border-b border-slate-600/50"
                  >
                    <td className="table-td text-center">{rank.ranking}</td>
                    <td className="table-td text-center">
                      {rank.student_name}
                    </td>
                    <td className="table-td text-center">{rank.quizzesMark}</td>
                    <td className="table-td text-center">
                      {rank.assignmentsMark}
                    </td>
                    <td className="table-td text-center">{rank.totalMark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  } else if (rankings && rankings.length === 0) {
    content = (
      <p className="text-center mt-10 text-xl">
        Leaderboard currently not available{" "}
      </p>
    );
  }

  return <Layout>{content}</Layout>;
};

export default Leaderboard;
