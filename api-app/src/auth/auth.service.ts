import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LogInAuthDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(logInAuthDto: LogInAuthDto): Promise<any> {
    // Check if the user exists
    const user = await this.userRepository.findOne({ where: { username: logInAuthDto.username } });
    if (!user) {
      return null;
    }
    // Check if the password is correct
    const match = await compare(logInAuthDto.password, user.password);
    if (!match) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
