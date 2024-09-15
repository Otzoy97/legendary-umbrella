import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { User } from './user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    try {
      const count = await this.userRepository.count();
      console.log('User count: ', count);
    } catch (error) {
      console.error('Database connection error: ', error);
    }
  }
}
