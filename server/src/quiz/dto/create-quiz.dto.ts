import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
import {
  QUIZ_TITLE_MAX_LENGTH,
  QUIZ_TITLE_MIN_LENGTH,
} from 'src/constants/quiz.constants';

export class CreateQuizDto {
  @IsString()
  @MinLength(QUIZ_TITLE_MIN_LENGTH)
  @MaxLength(QUIZ_TITLE_MAX_LENGTH)
  title: string;

  @IsBoolean()
  isPublic: boolean;
}
