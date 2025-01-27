export interface IQuestion {
  id: string;
  content: string;
  correctAnswer?: string;
  options?: string;
  quizId: string;
}

export type TQuestionInput = {
  content: string;
  correctAnswer?: string;
  options: TQUestionOption[];
};

type TQUestionOption = {
  optionText: string;
  isCorrect: boolean;
};
