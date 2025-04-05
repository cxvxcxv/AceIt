import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { IQuiz } from '@/types/quiz.types';

import { filterQuizzes } from '@/utils/filterQuizzes';

type TQuizSearchProps = {
  setFilteredQuizzes: (quizzes: IQuiz[]) => void;
  quizzes?: IQuiz[];
};

export const QuizSearch = ({
  quizzes,
  setFilteredQuizzes,
}: TQuizSearchProps) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setFilteredQuizzes(filterQuizzes(searchValue, quizzes));
  }, [searchValue]);

  return (
    <div className="group relative flex-grow">
      <Search
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-primary"
        strokeWidth={1.75}
      />
      <input
        type="text"
        id="QuizSearch"
        placeholder="Search quizzes..."
        className="w-full rounded-lg border border-gray-300 p-2 pl-10 outline-none focus:border-primary"
        onChange={e => setSearchValue(e.target.value)}
      />
    </div>
  );
};
