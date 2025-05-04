'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Loader } from '@/components/Loader';
import { QuestionOptions } from '@/components/question/QuestionOptions';
import { ButtonActive } from '@/components/ui/button/ButtonActive';
import { TransparentGlass } from '@/components/ui/div/TransparentGlass';

import { ANSWERS } from '@/constants/storage.constants';

import { useQuiz } from '@/hooks/useQuiz';

import { safeParseJson } from '@/utils/safeParseJson';

export const Quiz = () => {
  const params = useParams();
  const quizId = params.quizId as string | undefined;

  const { data: quiz, isLoading, isError } = useQuiz(quizId || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalQuestions = quiz?.questions.length || 0;
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  //updates the answers state and saves into localstorage
  const handleChangeAnswer = (questionId: string, options: string[]) => {
    const updatedAnswers = {
      ...answers,
      [questionId]: options,
    };

    setAnswers(updatedAnswers);
    localStorage.setItem(ANSWERS, JSON.stringify(updatedAnswers));
  };

  useEffect(() => {
    const storedAnswers = localStorage.getItem(ANSWERS);
    if (storedAnswers) {
      try {
        const parsedAnswers = JSON.parse(storedAnswers);
        if (typeof parsedAnswers === 'object' && parsedAnswers !== null) {
          setAnswers(parsedAnswers);
          console.log(parsedAnswers);
          toast.success('Loaded saved answers');
        }
      } catch (error) {
        console.error('Failed to parse stored answers:', error);
        toast.error('Failed to load saved answers');
      }
    }
  }, []);

  if (!quizId || isLoading) return <Loader />;

  if (isError || !quiz) return <h1>Failed to load quiz.</h1>;

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
          <div className="w-full max-w-3xl p-8">
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
              {question.options?.length && (
                <QuestionOptions
                  questionId={question.id}
                  options={safeParseJson(question.options) || []}
                  onChangeAnswer={handleChangeAnswer}
                  savedOptionIds={answers[question.id] || []}
                />
              )}
            </div>
          </div>
        </div>
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
