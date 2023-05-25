export const checkSelectedAnswers = (relatedQuizzes, answers) => {
  let correctAnswers = 0;

  relatedQuizzes.forEach((quiz) => {
    const userAnswers = answers[quiz.id] || [];
    const correctOptionIds = quiz.options
      .filter((option) => option.isCorrect)
      .map((option) => option.id);

    if (
      userAnswers.length === correctOptionIds.length &&
      userAnswers.every((answer) => correctOptionIds.includes(answer))
    ) {
      correctAnswers++;
    }
  });

  return correctAnswers;
};
