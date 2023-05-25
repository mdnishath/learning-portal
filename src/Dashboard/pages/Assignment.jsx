import React from "react";
import Layout from "../../shared/components/Layout";
import AssignmentTable from "../components/AssignmentTable";
import { useGetAssignmentsQuery } from "../../features/assignments/assignmentsApi";
import Loader from "../../shared/ui/Loader";
import { chandgeAddingStutas } from "../../features/assignments/assignmentsSlice";
import { useDispatch } from "react-redux";
import AddAssignmentModal from "../components/AddAssignmentModal";

const Assignment = () => {
  const dispatch = useDispatch();
  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsQuery();
  // //console.log(assignments);
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
  } else if (!isLoading && !isError && assignments?.length === 0) {
    content = <p className="text-center text-xl">No assignment found</p>;
  } else if (!isLoading && !isError && assignments?.length > 0) {
    content = <AssignmentTable assignments={assignments} />;
  }

  return (
    <>
      <AddAssignmentModal />
      <Layout>
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
              <div className="w-full flex">
                <button
                  onClick={() => dispatch(chandgeAddingStutas())}
                  className="btn ml-auto"
                >
                  Add Assignment
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

export default Assignment;
