'use client';

import { useQuery } from '@tanstack/react-query';

import { QuizService } from '@/services/quiz.service';

export function useQuiz(quizId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['quizId'],
    queryFn: () => QuizService.getOne(quizId),
  });

  return { data, isLoading, isError };
}
