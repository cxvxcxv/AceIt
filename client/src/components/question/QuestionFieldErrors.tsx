import { FieldErrors } from 'react-hook-form';

import { TQuizFormSchema } from '@/schemas/quiz.schema';

type Props = {
  errors: FieldErrors<TQuizFormSchema>;
  questionIndex: number;
};

export const QuestionFieldErrors = ({ errors, questionIndex }: Props) => {
  const questionErrors = errors.questions?.[questionIndex];

  if (!questionErrors) return null;

  const optionsError = questionErrors.options;

  return (
    <div className="space-y-1">
      {questionErrors.content && (
        <p className="text-sm text-error">{questionErrors.content.message}</p>
      )}

      {typeof optionsError?.message === 'string' && (
        <p className="text-sm text-error">{optionsError.message}</p>
      )}

      {Array.isArray(optionsError) &&
        optionsError.map((optionError, optionIndex) => (
          <div key={optionIndex}>
            {optionError?.optionText && (
              <p className="text-sm text-error">
                Option #{optionIndex + 1}: {optionError.optionText.message}
              </p>
            )}
            {optionError?.isCorrect && (
              <p className="text-sm text-error">
                Option #{optionIndex + 1}: {optionError.isCorrect.message}
              </p>
            )}
          </div>
        ))}
    </div>
  );
};
