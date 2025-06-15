import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { OPTION_TEXT_MAX_LENGTH } from 'src/constants/question-option.constants';

export class QuestionOptionDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(OPTION_TEXT_MAX_LENGTH)
  optionText: string;

  @IsBoolean()
  isCorrect: boolean;
}
