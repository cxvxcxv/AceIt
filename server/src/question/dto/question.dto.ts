import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import {
  CORRECT_ANSWER_MAX_LENGTH,
  OPTIONS_MAX_QUANTITY,
  OPTIONS_MIN_QUANTITY,
  QUESTION_CONTENT_MAX_LENGTH,
} from 'src/constants/question.constants';
import { IsCorrectAnswerOrOptions } from '../validators/is-correct-answer-or-options.validator';
import { QuestionOptionDto } from './question-option.dto';

export class QuestionDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(QUESTION_CONTENT_MAX_LENGTH)
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(CORRECT_ANSWER_MAX_LENGTH)
  correctAnswer?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(OPTIONS_MIN_QUANTITY)
  @ArrayMaxSize(OPTIONS_MAX_QUANTITY)
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  options?: QuestionOptionDto[];

  @IsCorrectAnswerOrOptions() //custom validator
  validateCorrectAnswerOrOptions!: boolean;
}
