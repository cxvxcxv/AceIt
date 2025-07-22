'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, LockOpen } from 'lucide-react';
import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Loader } from '@/components/Loader';
import { EditQuestions } from '@/components/question/EditQuestions';
import { ActiveButton } from '@/components/ui/button/ActiveButton';
import { TransparentUnderlineInput } from '@/components/ui/input/TransparentUnderlineInput';
import { Select } from '@/components/ui/select/Select';

import { QUIZ_TITLE_MAX_LENGTH } from '@/constants/quiz.constants';

import { PAGES } from '@/config/urls.config';

import { useEditQuizMutation } from '@/hooks/useEditQuizMutation';
import { useQuiz } from '@/hooks/useQuiz';

import { transformQuizQuestions } from '@/utils/question/transformQuizQuestions';

import { TQuizFormSchema, quizSchema } from '@/schemas/quiz.schema';

export const QuizSettings = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { data: quiz, isLoading, isError } = useQuiz(quizId);

  const { mutate, isSuccess } = useEditQuizMutation(quizId);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<TQuizFormSchema>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      questions: [],
    },
    mode: 'onTouched',
  });
  const onSubmit: SubmitHandler<TQuizFormSchema> = data => {
    mutate(data);
  };

  const isPublic = watch('isPublic');

  useEffect(() => {
    quiz &&
      reset({
        title: quiz.title,
        questions: transformQuizQuestions(quiz.questions),
      });
  }, [quiz, reset]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Saved successfully');
      redirect(PAGES.QUIZZES);
    }
  }, [isSuccess]);

  if (isError) return <h1>An unknown error occurred. Try again later</h1>;
  if (isLoading || !quiz || !quizId) return <Loader />;

  return (
    <section className="md:w-1/2">
      <form
        id="edit-quiz"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center rounded-md border-t-8 border-primary"
      >
        <TransparentUnderlineInput
          id="title"
          placeholder="Title"
          defaultValue={quiz.title}
          maxLength={QUIZ_TITLE_MAX_LENGTH}
          className="mb-2 p-6 text-2xl"
          {...register('title', {
            required: true,
            maxLength: QUIZ_TITLE_MAX_LENGTH,
          })}
        />
        <Select
          id="privacy"
          icon={isPublic ? LockOpen : Lock}
          wrapperClassname="w-full lg:w-1/4 md:self-end"
          {...register('isPublic', {
            setValueAs: v => v === 'true',
          })}
        >
          <option value="true">Public</option>
          <option value="false">Private</option>
        </Select>
        <EditQuestions control={control} register={register} errors={errors} />
        <ActiveButton
          type="submit"
          disabled={!isValid}
          className="w-1/2 rounded-md p-2"
        >
          Save
        </ActiveButton>
      </form>
    </section>
  );
};
