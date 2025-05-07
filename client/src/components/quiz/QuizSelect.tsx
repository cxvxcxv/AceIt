import { ArrowDownUp } from 'lucide-react';

import { TQuizSortType } from '@/types/quiz.types';

type TQuizSelectProps = {
  setSortType: (sortType: TQuizSortType) => void;
};

export const QuizSelect = ({ setSortType }: TQuizSelectProps) => {
  return (
    <div className="relative">
      <ArrowDownUp
        strokeWidth={1.75}
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
      />
      <select
        id="quizSelect"
        className="w-full rounded-lg border border-gray-300 p-2 pl-10"
        onChange={e => setSortType(e.target.value as TQuizSortType)}
      >
        <option value="title">Title</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};
