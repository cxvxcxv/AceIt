import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { REFRESH_TOKEN_EXP_DAYS } from 'src/constants/auth.constants';
import { JWT_EXP } from 'src/constants/env.constants';
import { IJwtPayload } from 'src/types/auth.types';
import { UserService } from 'src/user/user.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async register(authUserDto: AuthUserDto) {
    //separates password and updatedAt to not include in return
    const { password, updatedAt, ...user } =
      await this.userService.create(authUserDto);

    const tokens = this.issueTokens({
      id: user.id,
      username: user.username,
    });

    return { user, ...tokens };
  }

  async login(authUserDto: AuthUserDto) {
    const { password, ...user } = await this.userService.findOne(
      authUserDto.username,
    );
    if (!user || !(await verify(password, authUserDto.password)))
      throw new UnauthorizedException('invalid credentials');

    const tokens = this.issueTokens({
      id: user.id,
      username: user.username,
    });

    return { user, ...tokens };
  }

  private issueTokens(payload: IJwtPayload) {
    const accessToken =
      `Bearer ` +
      this.jwtService.sign(payload, {
        expiresIn: this.configService.get(JWT_EXP),
      });
    const refreshToken =
      `Bearer ` +
      this.jwtService.sign(payload, {
        expiresIn: `${REFRESH_TOKEN_EXP_DAYS}d`,
      });

    return { accessToken, refreshToken };
  }
}
