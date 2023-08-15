import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/interfaces/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Res() res: Response, @Body() signupDto: SignupDto) {
    try {
      await this.authService.signup(signupDto);
      res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: e.message });
    }
  }

  @Get('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res() res: Response) {
    try {
      const jwtPayload: JwtPayload = {
        iat: Date.now().toString(),
        id: req.user.id,
      };
      const token = await this.authService.getToken(jwtPayload);
      await this.authService.saveRefreshToken(token.refreshToken, req.user.id);

      res.json({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: e.message });
    }
  }

  @Post('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(@Req() req, @Res() res) {
    try {
      const { refreshToken, id, role } = req.user;

      await this.authService.checkRefreshToken(refreshToken, id);
      const payload: JwtPayload = {
        id,
        iat: new Date().toISOString(),
      };
      const token = await this.authService.getToken(payload);
      await this.authService.saveRefreshToken(token.refreshToken, id);

      res.json({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
    } catch (err) {
      res.sendStatus(401);
    }
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req) {
    const { id } = req.user;
    await this.authService.removeRefreshToken(id);
  }
}
