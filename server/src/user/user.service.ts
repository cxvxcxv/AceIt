import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(userIdOrName: string) {
    return await this.prismaService.user.findFirst({
      where: { OR: [{ id: userIdOrName }, { username: userIdOrName }] },
      include: { quizzes: { orderBy: { updatedAt: 'desc' } } },
    });
  }

  async create(authUserDto: AuthUserDto) {
    const user = await this.findOne(authUserDto.username);

    if (user) throw new BadRequestException('user already exists');

    const hashedPassword = await hash(authUserDto.password);

    return await this.prismaService.user.create({
      data: { username: authUserDto.username, password: hashedPassword },
    });
  }
}
