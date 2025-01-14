import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { options } from './config/jwt-config';
import { GUARDS } from './guards';
import { STRATEGIES } from './strategies';

@Module({
  imports: [PassportModule, JwtModule.registerAsync(options()), UserModule],
  controllers: [AuthController],
  providers: [AuthService, ...STRATEGIES, ...GUARDS],
})
export class AuthModule {}
