import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    const isVerified = await this.userService.verifyEmail(token);

    if (!isVerified)
      throw new HttpException(
        { message: 'Invalid or expired token.' },
        HttpStatus.BAD_REQUEST,
      );

    return { message: 'Email verified successfully.' };
  }
}
