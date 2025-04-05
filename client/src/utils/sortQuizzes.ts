import { TQuizSortType } from '@/types/quiz.types';

import { IQuiz } from './../types/quiz.types';

export const sortQuizzes = (sortType: TQuizSortType, quizzes?: IQuiz[]) => {
  if (sortType === 'title')
    return quizzes?.sort((a: IQuiz, b: IQuiz) =>
      a.title.localeCompare(b.title),
    );
  else if (sortType === 'newest')
    return quizzes?.sort(
      (a: IQuiz, b: IQuiz) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  else if (sortType === 'oldest')
    return quizzes?.sort(
      (a: IQuiz, b: IQuiz) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    );

  return [];
};
