import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    // Check if the user already exists
    const user = await this.userRepository.findOne({ where: { username: createUserDto.username } });
    if (user) {
      throw new ConflictException('User already exists');
    }
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await hash(createUserDto.password, saltRounds);
    // Create the user and save it to the database
    const newUser = this.userRepository.create({
      username: createUserDto.username,
      password: hashedPassword
    })
    const payload = { username: newUser.username, sub: newUser.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
