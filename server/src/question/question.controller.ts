import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Protect } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { QuestionDto } from './dto/question.dto';
import { QuestionService } from './question.service';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('quizzes/:quizId/:questionId')
  @Protect()
  async findOne(
    @Param('quizId') quizId: string,
    @Param('questionId') questionId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.questionService.findOne(userId, quizId, questionId);
  }

  @Post('quizzes/:quizId')
  @Protect()
  async create(
    @Body() questionDto: QuestionDto,
    @Param('quizId') quizId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.questionService.create(userId, quizId, questionDto);
  }

  @Put('quizzes/:quizId/:questionId')
  @Protect()
  async update(
    @Body() questionDto: QuestionDto,
    @Param('questionId') questionId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.questionService.update(userId, questionId, questionDto);
  }

  @Delete('quizzes/:quizId/:questionId')
  @Protect()
  async delete(
    @Param('questionId') questionId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.questionService.delete(userId, questionId);
  }
}
