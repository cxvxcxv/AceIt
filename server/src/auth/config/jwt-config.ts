import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { JWT_EXP, JWT_SECRET } from 'src/constants/env.constants';

const jwtModuleOptions = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get(JWT_SECRET),
  signOptions: {
    expiresIn: configService.get(JWT_EXP),
  },
});

export const options = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => jwtModuleOptions(configService),
});
