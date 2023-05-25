import React, { useState } from "react";
import { useSelector } from "react-redux";
import { filterStutasSeletor } from "../../features/assignmentMarks/assignmentMarksSelectors";
import { useUpdateMarkMutation } from "../../features/assignmentMarks/assignmentMarksApi";
import produce from "immer";

const AssignmentMarkTable = ({ marks }) => {
  const { stutas } = useSelector(filterStutasSeletor);
  const [marksData, setMarksData] = useState({});

  const [updateMark, { data, isLoading, isError, error }] =
    useUpdateMarkMutation();

  //Update mark
  const handleMarkUpdate = (id) => {
    const foundAssignment = marks.find((m) => {
      return m.id === id;
    });
    const updatedAssignmentWithMark = produce(foundAssignment, (draft) => {
      draft.mark = parseInt(marksData[id]);
      draft.status = "published";
    });
    updateMark({ id, data: updatedAssignmentWithMark });
    // //console.log(updatedAssignmentWithMark);
  };

  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Assignment</th>
          <th className="table-th">Date</th>
          <th className="table-th">Student Name</th>
          <th className="table-th">Repo Link</th>
          <th className="table-th">Mark</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">
        {marks
          .filter((mark) => {
            switch (stutas) {
              case "pending":
                return mark.status === "pending";
              case "published":
                return mark.status === "published";
              case "total":
              default:
                return true;
            }
          })
          .map((mark) => (
            <tr key={mark.id}>
              <td className="table-td">{mark?.title}</td>
              <td className="table-td">{mark?.createdAt}</td>
              <td className="table-td">{mark?.student_name}</td>
              <td className="table-td">{mark?.repo_link}</td>
              {mark?.status === "pending" ? (
                <td className="table-td input-mark">
                  <input
                    max="100"
                    value={marksData[mark.id] ?? 0}
                    onChange={(e) => {
                      setMarksData(
                        produce(marksData, (draft) => {
                          draft[mark.id] = e.target.value;
                        })
                      );
                    }}
                  />
                  <button onClick={() => handleMarkUpdate(mark.id)}>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </button>
                </td>
              ) : (
                <td className="table-td">{mark.mark}</td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AssignmentMarkTable;
