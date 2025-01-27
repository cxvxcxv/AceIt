import { IQuiz } from './quiz.types';

export interface IUser extends IProfile {
  password: string;
}

export interface IProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  quizzes: IQuiz[];
}
