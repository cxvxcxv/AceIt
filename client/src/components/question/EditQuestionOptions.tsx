import { Plus, Trash2 } from 'lucide-react';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';

import { OPTION_TEXT_MAX_LENGTH } from '@/constants/question-option.constants';

import { createEmptyOption } from '@/utils/question/createEmptyOption';

import Checkbox from '../ui/input/Checkbox';
import { TransparentUnderlineInput } from '../ui/input/TransparentUnderlineInput';

import { TQuizFormSchema } from '@/schemas/quiz.schema';

type TEditQuestionOptionsProps = {
  questionIndex: number;
  control: Control<TQuizFormSchema>;
  register: UseFormRegister<TQuizFormSchema>;
  errors: FieldErrors<TQuizFormSchema>;
};

export const EditQuestionOptions = ({
  questionIndex,
  control,
  register,
  errors,
}: TEditQuestionOptionsProps) => {
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  return (
    <div className="mt-4 grid gap-2 md:grid-cols-2">
      {options.map((option, optionIndex) => (
        <div key={option.id} className="flex">
          <Checkbox
            id={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
            label=""
            shape="square"
            className="bg-gray-100 text-primary"
            {...register(
              `questions.${questionIndex}.options.${optionIndex}.isCorrect` as const,
            )}
          />
          <TransparentUnderlineInput
            id={`input-${option.id}`}
            defaultValue={option.optionText}
            placeholder="Option..."
            maxLength={OPTION_TEXT_MAX_LENGTH}
            className="overflow-hidden text-ellipsis whitespace-nowrap text-sm"
            {...register(
              `questions.${questionIndex}.options.${optionIndex}.optionText` as const,
              { maxLength: OPTION_TEXT_MAX_LENGTH },
            )}
          />
          <button
            type="button"
            onClick={() => remove(optionIndex)}
            className="hover:scale-105 hover:text-error active:scale-95"
          >
            <Trash2 strokeWidth={1.25} className="h-4 w-4" />
          </button>
        </div>
      ))}
      {options.length < 4 ? (
        <button
          type="button"
          onClick={() => append(createEmptyOption())}
          className="rounded-md border-2 border-dashed border-gray-100 p-2 text-gray-100 transition-colors hover:animate-pulse hover:border-primary hover:text-primary"
        >
          <Plus className="m-auto" />
        </button>
      ) : null}
    </div>
  );
};
