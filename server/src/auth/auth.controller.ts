import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { loginDTO } from './DTO/login.dto';
import { AuthService } from './auth.service';
import * as Jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('login/student')
  async loginStudent(
    @Body() data: loginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const secret = this.config.get('SECRET');

    const { password, ...currentStudent } =
      await this.authService.loginStudent(data);

    const cookie = Jwt.sign(currentStudent, secret, {
      expiresIn: '1h',
    });
    res.cookie('session', cookie, { httpOnly: true, maxAge: 3600 });

    return currentStudent;
  }

  @Get('logout')
  logout(@Res() res: Response): void {
    res
      .cookie('session', { httpOnly: true, maxAge: 0 })
      .status(200)
      .send({ message: 'Logged out successfully' });
  }
}
