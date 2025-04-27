export interface IQuestion {
  id: string;
  content: string;
  correctAnswer?: string;
  options?: string;
  quizId: string;
}

export interface IQuestionOption {
  optionText: string;
  isCorrect: boolean;
}

export type TQuestionInput = {
  content: string;
  correctAnswer?: string;
  options: IQuestionOption[];
};
