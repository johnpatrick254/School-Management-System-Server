import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { loginDTO } from './DTO/login.dto';
import { AuthService } from './auth.service';
import * as Jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Public } from './publicroute.decorator';
import { extractBearerToken } from './Util/extracttoken.util';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) { }

  @Public()
  @Post('login/student')
  async loginStudent(
    @Body() data: loginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const secret = this.config.get('SECRET');

    const { password, EOC, ...currentStudent } =
      await this.authService.loginStudent(data);

    const token = Jwt.sign(currentStudent, secret, {
      expiresIn: '1h',
    });


    res.status(200).send({ accessToken: token });
  }


  @Public()
  @Post('login/staff')
  async loginStaff(
    @Body() data: loginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const secret = this.config.get('SECRET');

    const { password, ...currentStudent } =
      await this.authService.loginStaff(data);

    const token = Jwt.sign(currentStudent, secret, {
      expiresIn: '1h',
    });
    res.send({ accessToken: token });
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response): void {
    res
      .cookie('user', { httpOnly: true, maxAge: 0 })
      .status(200)
      .send({ message: 'Logged out successfully' });
  }

  @Get('validate')
  async validateToken(@Req() req: Request, @Res() res: Response) {
    const { authorization } = req.headers;
    const accessToken = extractBearerToken(authorization);
    if (!accessToken) throw new UnauthorizedException();
    const isValid = this.authService.validateUser(accessToken);
    if (isValid === true) res.status(200);
  }
}

