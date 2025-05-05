'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Loader } from '@/components/Loader';
import { QuizQuestion } from '@/components/question/QuizQuestion';
import { ButtonActive } from '@/components/ui/button/ButtonActive';

import { useQuiz } from '@/hooks/useQuiz';
import { useStoredAnswers } from '@/hooks/useStoredAnswers';

export const Quiz = () => {
  const params = useParams();
  const quizId = params.quizId as string | undefined;
  const { data: quiz, isLoading, isError } = useQuiz(quizId || '');

  const { answers, updateAnswers } = useStoredAnswers();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!quizId || isLoading) return <Loader />;
  if (isError || !quiz) return <h1>Failed to load quiz.</h1>;

  const totalQuestions = quiz.questions.length;

  return (
    <section>
      {quiz.questions.map((question, index) => (
        <QuizQuestion
          key={question.id}
          question={question}
          index={index}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          storedAnswer={answers[question.id] || []}
          onChangeAnswer={updateAnswers}
        />
      ))}

      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="w-full max-w-3xl p-8">
          <nav className="mt-12 flex items-center justify-between gap-8">
            <ButtonActive
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="w-full flex-1 select-none"
            >
              Previous
            </ButtonActive>
            <Link
              href={`/quizzes/${quizId}/results`}
              className={clsx('flex-1 text-center transition', {
                invisible: currentIndex !== totalQuestions - 1,
                'animate-pulse': currentIndex === totalQuestions - 1,
              })}
            >
              Finish Quiz
            </Link>
            <ButtonActive
              onClick={() =>
                setCurrentIndex(Math.min(currentIndex + 1, totalQuestions - 1))
              }
              disabled={currentIndex === totalQuestions - 1}
              className="w-full flex-1 select-none"
            >
              Next
            </ButtonActive>
          </nav>
        </div>
      </div>
    </section>
  );
};
