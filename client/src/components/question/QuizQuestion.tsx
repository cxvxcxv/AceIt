import { TransparentGlass } from '@/components/ui/div/TransparentGlass';

import { IQuestion } from '@/types/question.types';

import { safeParseJson } from '@/utils/safeParseJson';

import { QuestionOptions } from './QuestionOptions';

type TQuizQuestionProps = {
  question: IQuestion;
  index: number;
  currentIndex: number;
  totalQuestions: number;
  storedAnswer: string[];
  onChangeAnswer: (questionId: string, options: string[]) => void;
};

export const QuizQuestion = ({
  question,
  index,
  currentIndex,
  totalQuestions,
  storedAnswer,
  onChangeAnswer,
}: TQuizQuestionProps) => {
  return (
    <div
      key={question.id}
      className={`absolute inset-0 flex w-full flex-col items-center justify-center transition-all duration-500 ease-in-out ${
        index === currentIndex
          ? 'pointer-events-auto scale-100 opacity-100'
          : 'pointer-events-none scale-90 opacity-0'
      }`}
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
        {question.options && (
          <div className="mt-12">
            <QuestionOptions
              questionId={question.id}
              options={safeParseJson(question.options) || []}
              onChangeAnswer={onChangeAnswer}
              storedOptionIds={storedAnswer}
            />
          </div>
        )}
      </div>
    </div>
  );
};
