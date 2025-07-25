'use client';

import { useQuery } from '@tanstack/react-query';

import { QuizService } from '@/services/quiz.service';

export function useQuiz(quizId: string | undefined) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['quizId'],
    queryFn: () => QuizService.getOne(quizId as string),
    enabled: !!quizId,
  });

  return { data, isLoading, isError };
}
