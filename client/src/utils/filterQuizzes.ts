import { IQuiz } from '@/types/quiz.types';

export const filterQuizzes = (searchValue: string, quizzes: IQuiz[] = []) => {
  const filteredQuizzes = quizzes?.filter(quiz =>
    quiz.title.toLowerCase().includes(searchValue.toLowerCase().trim()),
  );
  return filteredQuizzes;
};
