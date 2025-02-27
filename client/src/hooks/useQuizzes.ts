'use client';

import { useQuery } from '@tanstack/react-query';

import { QuizService } from '@/services/quiz.service';

export function useQuizzes() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => QuizService.getAll(),
  });

  return { data, isLoading, isError };
}
