import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../features/assignmentMarks/assignmentMarksSlice";
import { filterStutasSeletor } from "../../features/assignmentMarks/assignmentMarksSelectors";

const AssignmentFilters = ({ marks }) => {
  const { stutas } = useSelector(filterStutasSeletor);
  const dispatch = useDispatch();

  const total = marks?.length;
  const pending = marks.filter(
    (assignment) => assignment.status === "pending"
  ).length;
  const sent = marks.filter(
    (assignment) => assignment.status === "published"
  ).length;

  // Handeling filter array

  const handleFilterChange = (type) => {
    dispatch(changeFilter(type));
  };

  return (
    <ul className="assignment-status">
      <li
        onClick={() => handleFilterChange("total")}
        className={`cursor-pointer ${stutas === "total" && "bg-[#4F46E5]"}`}
      >
        Total <span>{total}</span>
      </li>
      <li
        onClick={() => handleFilterChange("pending")}
        className={`cursor-pointer ${stutas === "pending" && "bg-[#16A34A]"}`}
      >
        Pending <span>{pending}</span>
      </li>
      <li
        onClick={() => handleFilterChange("published")}
        className={`cursor-pointer ${stutas === "published" && "bg-[#CA8A04]"}`}
      >
        Mark Sent <span>{sent}</span>
      </li>
    </ul>
  );
};

export default AssignmentFilters;
