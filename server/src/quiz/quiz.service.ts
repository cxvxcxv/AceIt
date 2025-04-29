import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: string) {
    return await this.prismaService.quiz.findMany({
      where: { OR: [{ userId }, { isPublic: true }] },
      select: {
        id: true,
        title: true,
        isPublic: true,
        updatedAt: true,
        userId: true,
        _count: { select: { questions: true } },
      },
      distinct: ['id'], //avoids repetition if isPublic and userId are found
    });
  }

  async findOne(userId: string, quizId: string) {
    const quiz = await this.validateQuizExistence(quizId, { questions: true });

    if (!quiz.isPublic && quiz.userId !== userId)
      throw new ForbiddenException('no access');
    return quiz;
  }

  async create(userId: string, createQuizDto: CreateQuizDto) {
    return await this.prismaService.quiz.create({
      data: {
        title: createQuizDto.title,
        isPublic: createQuizDto.isPublic,
        user: { connect: { id: userId } },
      },
    });
  }

  async update(userId: string, quizId: string, updateQuizDto: UpdateQuizDto) {
    const quiz = await this.validateQuizExistence(quizId);
    if (quiz.userId !== userId) throw new ForbiddenException('no access');

    return await this.prismaService.quiz.update({
      where: { id: quizId },
      data: updateQuizDto,
    });
  }

  async delete(userId: string, quizId: string) {
    const quiz = await this.validateQuizExistence(quizId);
    if (quiz.userId !== userId) throw new ForbiddenException('no access');
    return await this.prismaService.quiz.delete({ where: { id: quizId } });
  }

  async validateQuizExistence(
    quizId: string,
    quizInlucde: Prisma.QuizInclude = {},
  ) {
    const quiz = await this.prismaService.quiz.findUnique({
      where: { id: quizId },
      include: quizInlucde,
    });

    if (!quiz) throw new NotFoundException('quiz not found');

    return quiz;
  }
}
