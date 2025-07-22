import { useMutation } from '@tanstack/react-query';

import { TQuizFormSchema } from '@/types/quiz.types';

import { QuizService } from '@/services/quiz.service';

export function useEditQuizMutation(quizId: string) {
  return useMutation({
    mutationKey: ['editQuiz'],
    mutationFn: (data: TQuizFormSchema) => QuizService.update(quizId, data),
  });
}
