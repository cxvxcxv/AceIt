import { useQueryClient } from '@tanstack/react-query';
import { Lock, LockOpen, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  QUIZ_TITLE_MAX_LENGTH,
  QUIZ_TITLE_MIN_LENGTH,
} from '@/constants/quiz.constants';

import { TQuizInput } from '@/types/quiz.types';

import { useCreateQuizMutation } from '@/hooks/useCreateQuizMutation';

import { Dialog } from '../ui/Dialog';
import { ButtonActive } from '../ui/button/ButtonActive';
import { Field } from '../ui/input/Field';
import { Select } from '../ui/select/Select';

export const QuizCreate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TQuizInput>({
    mode: 'onBlur',
    defaultValues: { isPublic: true },
  });

  const isPublic = watch('isPublic');
  const { mutate, isSuccess } = useCreateQuizMutation();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<TQuizInput> = data => {
    data = {
      ...data,
      isPublic: String(data.isPublic) === 'true',
    };

    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Quiz created');
      reset();
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <div>
      <ButtonActive
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 rounded-md px-2 py-2"
      >
        <Plus />
        Create
      </ButtonActive>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} className="">
        <form id="create-quiz" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-primary">Create Quiz</h1>
          <Field
            id="title"
            label="title"
            className="mt-4"
            inputClassname="rounded-xl"
            {...register('title', {
              required: 'Title must not be empty',
              minLength: {
                value: QUIZ_TITLE_MIN_LENGTH,
                message: `Title must be at least ${QUIZ_TITLE_MIN_LENGTH} characters long`,
              },
              maxLength: {
                value: QUIZ_TITLE_MAX_LENGTH,
                message: `Title must be no more that ${QUIZ_TITLE_MAX_LENGTH} characters long`,
              },
            })}
          />
          <p className="mb-1 text-wrap text-sm text-error">
            {errors?.title?.message ?? '\u00A0'}
          </p>
          <Select
            id="privacy"
            icon={String(isPublic) === 'true' ? LockOpen : Lock}
            {...register('isPublic')}
          >
            <option value="true" defaultChecked>
              public
            </option>
            <option value="false">private</option>
          </Select>
          <ButtonActive className="mt-6 w-full rounded-xl py-1">
            Create
          </ButtonActive>
        </form>
      </Dialog>
    </div>
  );
};
