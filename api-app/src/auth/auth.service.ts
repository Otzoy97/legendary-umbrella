import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { response } from '../response/response';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    // Check if the user exists
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return null;
    }
    // Check if the password is correct
    const match = await compare(pass, user.password);
    if (!match) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return response(
      'User logged in successfully',
      { access_token: this.jwtService.sign(payload) }
    );

  }
}
