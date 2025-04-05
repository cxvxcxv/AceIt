import { IQuiz, TQuizSortType } from '@/types/quiz.types';

import { sortQuizzes } from '@/utils/sortQuizzes';

import QuizListItem from './QuizListItem';

type TQuizListProps = {
  quizzes?: IQuiz[];
  sortType: TQuizSortType;
};

export const QuizList = ({ quizzes, sortType }: TQuizListProps) => {
  const sortedQuizzes = sortQuizzes(sortType, quizzes);
  return (
    <div className="w-full">
      {sortedQuizzes?.map(quiz => <QuizListItem key={quiz.id} quiz={quiz} />)}
    </div>
  );
};
