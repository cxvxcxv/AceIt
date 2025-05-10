import { useMutation } from '@tanstack/react-query';

import { TQuizInput } from '@/types/quiz.types';

import { QuizService } from '@/services/quiz.service';

export const useCreateQuizMutation = () => {
  return useMutation({
    mutationKey: ['create-quiz'],
    mutationFn: (data: TQuizInput) => QuizService.create(data),
  });
};
