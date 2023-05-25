import React from "react";
import Layout from "../../shared/components/Layout";
import AssignmentFilters from "../components/AssignmentFilters";
import AssignmentMarkTable from "../components/AssignmentMarkTable";
import { useGetAssignmentMarksQuery } from "../../features/assignmentMarks/assignmentMarksApi";
import Loader from "../../shared/ui/Loader";
import Error from "../../shared/ui/Error";

const AssignmentMark = () => {
  const {
    data: marks,
    isLoading,
    isError,
    error,
  } = useGetAssignmentMarksQuery();
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
    content = <Error message={"Error hapend when fetcing Marks"} />;
  } else if (!isLoading && !isError && marks?.length === 0) {
    content = <Error message={"No Quizzes found"} />;
  } else if (!isLoading && !isError && marks?.length > 0) {
    content = (
      <div className="px-3 py-20 bg-opacity-10">
        <AssignmentFilters marks={marks} />
        <div className="overflow-x-auto mt-4">
          <AssignmentMarkTable marks={marks} />
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">{content}</div>
      </section>
    </Layout>
  );
};

export default AssignmentMark;
