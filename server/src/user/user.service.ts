import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfile(userId: string) {
    return await this.validateUserExistence(userId, {
      quizzes: { orderBy: { updatedAt: 'desc' } },
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

  async update(userId: string, authUserDto: AuthUserDto) {
    const user = await this.findOne(authUserDto.username);
    if (user && user.id !== userId)
      throw new BadRequestException('user already exists');

    const hashedPassword = await hash(authUserDto.password);

    return await this.prismaService.user.update({
      where: { id: userId },
      data: { username: authUserDto.username, password: hashedPassword },
    });
  }

  async delete(userId: string) {
    await this.validateUserExistence(userId);
    return await this.prismaService.user.delete({ where: { id: userId } });
  }

  async findOne(userIdOrName: string, userInclude: Prisma.UserInclude = {}) {
    return await this.prismaService.user.findFirst({
      where: { OR: [{ id: userIdOrName }, { username: userIdOrName }] },
      include: userInclude,
    });
  }

  async validateUserExistence(
    userIdOrName: string,
    userInclude: Prisma.UserInclude = {},
  ) {
    const user = await this.prismaService.user.findFirst({
      where: { OR: [{ id: userIdOrName }, { username: userIdOrName }] },
      include: userInclude,
    });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }
}
