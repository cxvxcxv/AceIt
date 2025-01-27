export interface IQuiz {
  id: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  title: string;
  userId: string;
}

export type TQuizInput = {
  title: string;
  isPublic: boolean;
};
