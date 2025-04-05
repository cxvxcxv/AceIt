'use client';

import { useEffect, useState } from 'react';

import { QuizList } from '@/components/quiz/QuizList';
import { QuizSearch } from '@/components/quiz/QuizSearch';
import { QuizSelect } from '@/components/quiz/QuizSelect';

import { IQuiz, TQuizSortType } from '@/types/quiz.types';

import { useQuizzes } from '@/hooks/useQuizzes';

export const Quizzes = () => {
  const { data: quizzes } = useQuizzes();
  const [filteredQuizzes, setFilteredQuizzes] = useState<IQuiz[]>(
    [] as IQuiz[],
  );
  const [sortType, setSortType] = useState<TQuizSortType>('title');

  useEffect(() => {
    quizzes && setFilteredQuizzes(quizzes);
  }, [quizzes]);

  return (
    <section className="flex min-h-screen justify-center bg-gray-50">
      <section className="flex w-4/5 flex-col items-center md:w-1/2">
        <h1 className="my-4 text-7xl text-primary">Quizzes</h1>
        <div className="mb-4 flex w-full justify-between gap-8">
          <QuizSearch
            quizzes={quizzes}
            setFilteredQuizzes={setFilteredQuizzes}
          />
          <QuizSelect setSortType={setSortType} />
        </div>
        <QuizList quizzes={filteredQuizzes} sortType={sortType} />
      </section>
    </section>
  );
};
