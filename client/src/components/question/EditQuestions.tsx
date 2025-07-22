import { Plus, Trash2 } from 'lucide-react';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';

import { QUESTION_CONTENT_MAX_LENGTH } from '@/constants/question.constants';

import { createEmptyQuestion } from '@/utils/question/createEmptyQuestion';

import { TransparentUnderlineInput } from '../ui/input/TransparentUnderlineInput';

import { EditQuestionOptions } from './EditQuestionOptions';
import { QuestionFieldErrors } from './QuestionFieldErrors';
import { TQuizFormSchema } from '@/schemas/quiz.schema';

type TEditQuestionsProps = {
  control: Control<TQuizFormSchema>;
  register: UseFormRegister<TQuizFormSchema>;
  errors: FieldErrors<TQuizFormSchema>;
};

export const EditQuestions = ({
  control,
  register,
  errors,
}: TEditQuestionsProps) => {
  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({ control, name: 'questions' });
  console.log(errors);
  return (
    <section className="flex w-full flex-col items-center">
      {questions.map((question, questionIndex) => (
        <div key={question.id} className="my-4 w-full rounded-xl">
          <div className="flex gap-2 text-gray-700">
            <p>Question #{questionIndex + 1}</p>
            <button
              onClick={() => remove(questionIndex)}
              className="hover:scale-105 hover:text-error active:scale-95"
            >
              <Trash2 strokeWidth={1.5} className="h-4 w-4" />
            </button>
          </div>
          <div id={`question-${question.id}`} className="bg-white p-6">
            <TransparentUnderlineInput
              id={`content-${question.id}`}
              defaultValue={question.content}
              placeholder="Question"
              maxLength={QUESTION_CONTENT_MAX_LENGTH}
              className="bg-gray-50 text-lg"
              {...register(`questions.${questionIndex}.content` as const, {
                required: true,
                maxLength: QUESTION_CONTENT_MAX_LENGTH,
              })}
            />
            <EditQuestionOptions
              questionIndex={questionIndex}
              control={control}
              register={register}
              errors={errors}
            />
          </div>

          <QuestionFieldErrors errors={errors} questionIndex={questionIndex} />
        </div>
      ))}
      <button
        onClick={() => append(createEmptyQuestion())}
        className="my-8 flex w-full justify-center rounded-md border-2 border-dashed border-gray-500 p-16 text-gray-500 transition-colors hover:animate-pulse hover:border-primary hover:text-primary"
      >
        <Plus />
      </button>
    </section>
  );
};
