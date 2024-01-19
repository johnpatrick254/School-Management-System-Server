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
import { logger } from 'src/lib/logger';
import { NoCache } from 'src/lib/caching';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) { }

  @Public()
  @Post('login/student')
  @NoCache()
  async loginStudent(
    @Body() data: loginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const secret = this.config.get('SECRET');
    const ENV = (this.config.get('ENV') as ("DEV" | "PROD"));
    const { password, EOC, ...currentStudent } =
      await this.authService.loginStudent(data);
    let cookieOptions;

    const token = Jwt.sign(currentStudent, secret, {
      expiresIn: '24h',
    });
    if (ENV === "DEV") {
      cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,//24HRS
        sameSite: "lax"
      }
    };
    if (ENV === "PROD") {
      cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,//24HRS
        sameSite: "lax",
        secure: true
      };
    }

    res.cookie("session", token, cookieOptions).status(200).send({ user: token });
  }

  @Public()
  @Post('login/staff')
  @NoCache()
  async loginStaff(
    @Body() data: loginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const secret = this.config.get('SECRET');

    const { password, ...currentStaff } =
      await this.authService.loginStaff(data);
      const ENV = (this.config.get('ENV') as ("DEV" | "PROD"));
      let cookieOptions;

      const token = Jwt.sign(currentStaff, secret, {
        expiresIn: '24h',
      });
      if (ENV === "DEV") {
        cookieOptions = {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,//24HRS
          sameSite: "lax"
        }
      };
      if (ENV === "PROD") {
        cookieOptions = {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,//24HRS
          sameSite: "lax",
          secure: true
        };
      }
  
      res.cookie("session", token, cookieOptions).status(200).send({ user: token })
  }

  @Get('logout')
  @NoCache()
  logout(@Res({ passthrough: true }) res: Response): void {
    res
      .cookie('session', "", { httpOnly: true, maxAge: 0 })
      .status(200)
      .send({ message: 'Logged out successfully' });
  }

  @Get('validate')
  @NoCache()
  async validateToken() {
    return { message: "user valid" };
  }
}
