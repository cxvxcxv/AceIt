import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizService } from 'src/quiz/quiz.service';
import { v4 as uuidv4 } from 'uuid';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly quizService: QuizService,
  ) {}

  async findOne(userId: string, quizId: string, questionId: string) {
    const quiz = await this.quizService.validateQuizExistence(quizId);
    if (!quiz.isPublic && quiz.userId !== userId)
      throw new ForbiddenException('no access');

    return await this.validateQuestionExistence(questionId);
  }

  async create(userId: string, quizId: string, questionDto: QuestionDto) {
    const quiz = await this.quizService.validateQuizExistence(quizId);
    if (quiz.userId !== userId) throw new ForbiddenException('no access');

    const optionsWithIds = questionDto.options?.map((option) => ({
      ...option,
      id: uuidv4(),
    }));

    const data: Prisma.QuestionCreateInput = {
      content: questionDto.content,
      options: JSON.stringify(optionsWithIds) || null,
      quiz: { connect: { id: quizId } },
    };

    const question = await this.prismaService.question.create({ data });
    return question;
  }

  async update(userId: string, questionId: string, questionDto: QuestionDto) {
    const question = await this.validateQuestionExistence(questionId);
    const quiz = await this.quizService.validateQuizExistence(question.quizId);

    if (quiz.userId !== userId) throw new ForbiddenException('no access');

    const data: Prisma.QuestionUpdateInput = {
      content: questionDto.content,
      options: questionDto.options ? JSON.stringify(questionDto.options) : null,
    };

    return await this.prismaService.question.update({
      where: { id: questionId },
      data,
    });
  }

  async delete(userId: string, questionId: string) {
    const question = await this.validateQuestionExistence(questionId);
    const quiz = await this.quizService.validateQuizExistence(question.quizId);

    if (quiz.userId !== userId) throw new ForbiddenException('no access');

    return await this.prismaService.question.delete({
      where: { id: questionId },
    });
  }

  private async validateQuestionExistence(questionId: string) {
    const question = await this.prismaService.question.findUnique({
      where: { id: questionId },
    });

    if (!question) throw new NotFoundException('question not found');

    return question;
  }
}
