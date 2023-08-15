import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from './entity/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload, User } from 'src/interfaces/auth';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import TokenEntity from './entity/token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,

    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const newUser = await this.userRepository.create({
      username: signupDto.username,
      password: signupDto.password,

      name: signupDto.name,
    });
    await this.userRepository.save(newUser);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: username, password: password },
    });

    if (!user) throw new UnauthorizedException();
    return {
      id: user.id,
    };
  }

  async getToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(refreshToken: string, id: number) {
    const existingToken = await this.tokenRepository.find({
      where: { user: { id } },
    });
    this.tokenRepository.remove(existingToken);
    const token = await this.tokenRepository.create({
      refreshToken,
      user: { id },
    });
    await this.tokenRepository.save(token);
  }
  async removeRefreshToken(id: number) {
    await this.tokenRepository.delete({ user: { id: id } });
  }

  async checkRefreshToken(refreshToken: string, id: number) {
    const token = await this.tokenRepository.findOne({
      where: { user: { id }, refreshToken },
    });
    if (!token) {
      // TODO: throw error
      throw new Error('Invalid refresh token - id error');
    }
  }
}
