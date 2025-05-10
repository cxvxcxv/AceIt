import clsx from 'clsx';
import { Play, Settings } from 'lucide-react';
import Link from 'next/link';

import { IQuiz } from '@/types/quiz.types';

import { PAGES } from '@/config/urls.config';

import { useProfile } from '@/hooks/useProfile';

const QuizCard = ({ quiz }: { quiz: Omit<IQuiz, 'questions'> }) => {
  const { data } = useProfile();
  return (
    <div className="relative">
      <Link
        href={`${PAGES.QUIZZES}/${quiz.id}`}
        onClick={e => !quiz._count.questions && e.preventDefault()}
        className={clsx(
          'group my-4 flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 transition-colors',
          {
            'hover:border-primary': quiz._count.questions,
            'opacity-70 hover:cursor-not-allowed': !quiz._count.questions,
          },
        )}
      >
        <div>
          <h3 className="text-lg font-medium">
            {quiz.title}
            {/* shows if a quiz is public or private if belongs to user */}
            <span className="text-sm font-normal text-gray-300">
              {quiz.userId === data?.id
                ? quiz.isPublic
                  ? ' (public)'
                  : ' (private)'
                : ''}
            </span>
          </h3>
          <p className="text-sm">
            {quiz._count?.questions} questions · Updated{' '}
            {new Date(quiz.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <Play
          className={clsx(
            'min-h-6 min-w-6 transition-colors group-hover:text-primary',
            {
              hidden: !quiz._count.questions,
            },
          )}
        />
      </Link>
      {quiz.userId === data?.id ? (
        <Link
          href={`${PAGES.QUIZZES}/${quiz.id}/settings`}
          title="edit quiz"
          className="absolute -right-8 top-1/2 -translate-y-1/2"
        >
          <Settings
            className="h-5 w-5 text-black/30 transition-all hover:rotate-90 hover:text-primary"
            strokeWidth={1.75}
          />
        </Link>
      ) : null}
    </div>
  );
};

export default QuizCard;
