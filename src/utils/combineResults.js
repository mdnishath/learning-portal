export const combineResults = (assignments, quizzes) => {
  const result = {};

  assignments.forEach((assignment) => {
    const studentId = assignment.student_id;
    if (!result[studentId]) {
      result[studentId] = {
        student_id: studentId,
        student_name: assignment.student_name,
        assignmentsMark: 0,
        quizzesMark: 0,
      };
    }
    result[studentId].assignmentsMark += assignment.mark;
  });

  quizzes.forEach((quiz) => {
    const studentId = quiz.student_id;
    if (!result[studentId]) {
      result[studentId] = {
        student_id: studentId,
        student_name: quiz.student_name,
        assignmentsMark: 0,
        quizzesMark: 0,
      };
    }
    result[studentId].quizzesMark += quiz.mark;
  });

  // Calculate the total mark and add ranking property for each student
  Object.values(result).forEach((student) => {
    student.totalMark = student.assignmentsMark + student.quizzesMark;
    student.ranking = 0;
  });

  // Sort students by totalMark in descending order
  const sortedStudents = Object.values(result).sort(
    (a, b) => b.totalMark - a.totalMark
  );

  // Assign rankings to students based on their totalMark
  let rank = 1;
  for (let i = 0; i < sortedStudents.length; i++) {
    sortedStudents[i].ranking = rank;
    if (
      i < sortedStudents.length - 1 &&
      sortedStudents[i].totalMark !== sortedStudents[i + 1].totalMark
    ) {
      rank++;
    }
  }

  return sortedStudents;
};
