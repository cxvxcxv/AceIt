'use client';

import { useEffect, useState } from 'react';

import { QuizCreate } from '@/components/quiz/QuizCreate';
import { QuizList } from '@/components/quiz/QuizList';
import { QuizSearch } from '@/components/quiz/QuizSearch';
import { QuizSelect } from '@/components/quiz/QuizSelect';

import { IQuiz, TQuizSortType } from '@/types/quiz.types';

import { useProfile } from '@/hooks/useProfile';
import { useQuizzes } from '@/hooks/useQuizzes';

import { filterQuizzes } from '@/utils/filterQuizzes';

export const Quizzes = () => {
  const { data: quizzes } = useQuizzes();
  const { data: user } = useProfile();
  const [filteredQuizzes, setFilteredQuizzes] = useState<IQuiz[]>(
    [] as IQuiz[],
  );
  const [sortType, setSortType] = useState<TQuizSortType>('title');

  useEffect(() => {
    quizzes && user && setFilteredQuizzes(filterQuizzes(user.id, '', quizzes));
  }, [quizzes, user]);

  return (
    <section className="flex min-h-screen justify-center bg-gray-50">
      <section className="flex w-4/5 flex-col items-center md:w-1/2">
        <h1 className="my-4 text-7xl text-primary">Quizzes</h1>
        <div className="mb-4 grid w-full gap-4 md:grid-cols-[6fr_3fr_1fr]">
          <div className="md:col-span-1">
            <QuizSearch
              userId={user?.id}
              quizzes={quizzes}
              setFilteredQuizzes={setFilteredQuizzes}
            />
          </div>

          <div className="grid grid-cols-[2fr_1fr] gap-4 md:col-span-2">
            <QuizSelect setSortType={setSortType} />
            <QuizCreate />
          </div>
        </div>

        <QuizList quizzes={filteredQuizzes} sortType={sortType} />
      </section>
    </section>
  );
};
