import { ArrowDownUp } from 'lucide-react';

import { TQuizSortType } from '@/types/quiz.types';

import { Select } from '../ui/select/Select';

type TQuizSelectProps = {
  setSortType: (sortType: TQuizSortType) => void;
};

export const QuizSelect = ({ setSortType }: TQuizSelectProps) => {
  return (
    <Select
      id="quiz-select"
      icon={ArrowDownUp}
      onChange={e => setSortType(e.target.value as TQuizSortType)}
    >
      <option value="title">Title</option>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </Select>
  );
};
