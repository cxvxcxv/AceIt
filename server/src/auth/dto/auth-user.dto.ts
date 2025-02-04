import { IsString, MaxLength, MinLength } from 'class-validator';
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from 'src/constants/user.constants';

export class AuthUserDto {
  @IsString()
  @MinLength(USERNAME_MIN_LENGTH)
  @MaxLength(USERNAME_MAX_LENGTH)
  username: string;

  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;
}
