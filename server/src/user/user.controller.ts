import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { Protect } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { UserService } from './user.service';

@Controller('profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Protect()
  async getProfile(@CurrentUser('id') userId: string) {
    return await this.userService.getProfile(userId);
  }

  @Put()
  @Protect()
  async update(
    @Body() authUserDto: AuthUserDto,
    @CurrentUser('id') userId: string,
  ) {
    return await this.userService.update(userId, authUserDto);
  }

  @Delete()
  @Protect()
  async delete(@CurrentUser('id') userId: string) {
    return await this.userService.delete(userId);
  }
}
