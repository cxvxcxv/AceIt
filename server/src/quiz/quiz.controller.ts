import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Protect } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizService } from './quiz.service';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get(':quizId')
  @Protect()
  async findOne(
    @Param('quizId') quizId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.quizService.findOne(userId, quizId);
  }

  @Post('new')
  @Protect()
  async create(
    @Body() createQuizDto: CreateQuizDto,
    @CurrentUser('id') userId: string,
  ) {
    return await this.quizService.create(userId, createQuizDto);
  }

  @Patch(':quizId')
  @Protect()
  async update(
    @Body() updateQuizDto: UpdateQuizDto,
    @Param('quizId') quizId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.quizService.update(userId, quizId, updateQuizDto);
  }

  @Delete(':quizId')
  @Protect()
  async delete(
    @Param('quizId') quizId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.quizService.delete(userId, quizId);
  }
}
