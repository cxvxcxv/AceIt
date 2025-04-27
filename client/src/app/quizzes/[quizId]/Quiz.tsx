'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Loader } from '@/components/Loader';
import { QuestionOptions } from '@/components/question/QuestionOptions';
import { ButtonActive } from '@/components/ui/button/ButtonActive';
import { TransparentGlass } from '@/components/ui/div/TransparentGlass';

import { useQuiz } from '@/hooks/useQuiz';

export const Quiz = () => {
  const params = useParams();
  const quizId = params.quizId as string | undefined;

  if (!quizId) return <Loader classname="text-white" />;

  const { data: quiz, isLoading, isError } = useQuiz(quizId);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) return <Loader classname="text-white" />;

  if (isError || !quiz)
    return <h1 className="text-white">Failed to load quiz.</h1>;

  const totalQuestions = quiz.questions.length;
  return (
    <section>
      {quiz.questions.map((question, index) => (
        <div
          key={question.id}
          className={clsx(
            'absolute inset-0 flex w-full flex-col items-center justify-center transition-all duration-500 ease-in-out',
            {
              'pointer-events-auto scale-100 opacity-100':
                index === currentIndex,
              'pointer-events-none scale-90 opacity-0': index !== currentIndex,
            },
          )}
        >
          <div className="w-full max-w-2xl">
            <TransparentGlass>
              <div className="mb-2 flex justify-between">
                <h3>Quiz Question</h3>
                <p>
                  {currentIndex + 1} / {totalQuestions}
                </p>
              </div>
              <h1>{question.content}</h1>
            </TransparentGlass>
            <div className="mt-12">
              {question.options && (
                <QuestionOptions options={question.options} />
              )}
            </div>
            <div className="mt-12 flex justify-between">
              <ButtonActive
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
              >
                Previous
              </ButtonActive>
              <ButtonActive
                onClick={() =>
                  setCurrentIndex(
                    Math.min(currentIndex + 1, totalQuestions - 1),
                  )
                }
                disabled={currentIndex === totalQuestions - 1}
              >
                Next
              </ButtonActive>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
