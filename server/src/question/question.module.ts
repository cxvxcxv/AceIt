import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuizModule } from 'src/quiz/quiz.module';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [PrismaModule, forwardRef(() => QuizModule)],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
