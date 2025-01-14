import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/auth.guard';

export const Protect = () => UseGuards(JwtAuthGuard);
