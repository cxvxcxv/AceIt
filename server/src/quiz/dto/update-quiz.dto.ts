import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { QuestionDto } from 'src/question/dto/question.dto';
import { CreateQuizDto } from './create-quiz.dto';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions?: QuestionDto[];
}
