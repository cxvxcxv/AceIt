import { IQuiz } from '@/types/quiz.types';

export const filterQuizzes = (
  userId: string,
  searchValue: string,
  quizzes: IQuiz[] = [],
) => {
  const filteredQuizzes = quizzes?.filter(
    quiz =>
      (quiz.userId === userId || quiz._count.questions) &&
      quiz.title.toLowerCase().includes(searchValue.toLowerCase().trim()),
  );
  return filteredQuizzes;
};
