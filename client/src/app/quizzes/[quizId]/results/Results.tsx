'use client';

import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Loader } from '@/components/Loader';
import { ScoreProgress } from '@/components/ScoreProgress';
import { ButtonActive } from '@/components/ui/button/ButtonActive';
import { TransparentGlass } from '@/components/ui/div/TransparentGlass';
import { LinkActive } from '@/components/ui/link/LinkActive';

import { useQuiz } from '@/hooks/useQuiz';
import { useStoredAnswers } from '@/hooks/useStoredAnswers';

import { countScore } from '@/utils/countScore';
import { fireConfetti } from '@/utils/fireConfetti';

export const Results = () => {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string | undefined;
  const { data: quiz } = useQuiz(quizId);
  const { answers } = useStoredAnswers(quizId, true);

  const scoreData = countScore(answers, quiz?.questions);
  const score = scoreData?.score ?? 0;
  const total = scoreData?.total ?? 0;
  const percentage = scoreData?.percentage ?? 0;

  const handleTryAgain = () => {
    if (quizId) {
      localStorage.removeItem(quizId);
      router.push(`/quizzes/${quizId}`);
    }
  };

  useEffect(() => {
    if (percentage >= 70) fireConfetti();
  }, [percentage]);

  if (!quizId || !quiz) return <Loader />;
  if (!answers) return <h1>Failed to load saved answers.</h1>;

  return (
    <section className="flex flex-col items-center p-8">
      <h1 className="mb-4 text-5xl">RESULTS</h1>
      <TransparentGlass className="flex flex-col items-center justify-center px-12 md:px-36">
        <ScoreProgress percentage={percentage} />
        <h1 className="mt-6 text-3xl">
          {score} <span className="text-2xl">out of</span> {total}
        </h1>
      </TransparentGlass>
      <div className="mt-16 flex w-full justify-between gap-16 text-center">
        <LinkActive
          href="/quizzes"
          title="Back to Quizzes"
          className="flex flex-1 items-center justify-center gap-2 px-6 py-3"
        >
          <ArrowLeft strokeWidth={1.5} className="min-h-6 min-w-6" />
          <span className="hidden md:block">Back to Quizzes</span>
        </LinkActive>
        <ButtonActive
          onClick={handleTryAgain}
          title="Try Again"
          className="flex flex-1 items-center justify-center gap-2 px-6 py-3"
        >
          <RefreshCw strokeWidth={1.5} className="min-h-6 min-w-6" />
          <span className="hidden md:block">Try Again</span>
        </ButtonActive>
      </div>
    </section>
  );
};
