import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { Response } from 'express';
import {
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXP_DAYS,
} from 'src/constants/auth.constants';
import {
  DOMAIN,
  EnumNodeEnv,
  JWT_EXP,
  NODE_ENV,
} from 'src/constants/env.constants';
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

  async refreshTokens(refreshToken: string) {
    const result: IJwtPayload = await this.jwtService.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('invalid refresh token');

    const user = await this.userService.findOne(result.id);
    if (!user) throw new NotFoundException('user not found');

    const tokens = this.issueTokens({ id: user.id, username: user.username });
    return tokens;
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

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    refreshToken = refreshToken.slice(7); //removes 'Bearer '

    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + REFRESH_TOKEN_EXP_DAYS);

    res.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true, //prevents client scripts accessing data stored in server cookies
      domain: this.configService.get(DOMAIN),
      expires: expiresIn,
      secure: true, //sends cookie over https
      sameSite:
        this.configService.get(NODE_ENV) === EnumNodeEnv.PRODUCTION
          ? 'lax'
          : 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(REFRESH_TOKEN, {
      httpOnly: true,
      domain: this.configService.get(DOMAIN),
      expires: new Date(0),
      secure: true,
      sameSite:
        this.configService.get(NODE_ENV) === EnumNodeEnv.PRODUCTION
          ? 'lax'
          : 'none',
    });
  }
}
