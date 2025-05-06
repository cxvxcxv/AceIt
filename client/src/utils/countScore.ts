import { IQuestion } from '@/types/question.types';
import { IAnswers } from '@/types/storage.types';

export const countScore = (
  userAnswers?: IAnswers,
  quizQuestions?: IQuestion[],
) => {
  if (!userAnswers || !quizQuestions) return {};

  let score = 0;
  const total = quizQuestions.length;

  for (const question of quizQuestions) {
    const userAnswer = userAnswers[question.id];

    if (!userAnswer) continue; //skips if question is unanswered

    if (question.options?.length) {
      const correctOptionIds = question.options
        .filter(opt => opt.isCorrect)
        .map(opt => opt.id);

      const isAllCorrect =
        userAnswer.length === correctOptionIds.length &&
        userAnswer.every(id => correctOptionIds.includes(id));

      if (isAllCorrect) score++;
    } else if (question.correctAnswer) {
      const userTextAnswer = userAnswer[0]?.trim().toLowerCase();
      const correctAnswer = question.correctAnswer.trim().toLowerCase();

      if (userTextAnswer === correctAnswer) score++;
    }
  }

  const percentage = Math.floor((score * 100) / total);

  return { score, total, percentage };
};
