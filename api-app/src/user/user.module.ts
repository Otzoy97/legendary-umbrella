import { Module, OnModuleInit } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { hash } from "bcrypt";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async onModuleInit() {
    const user = await this.userRepository.findOne({ where: { username: 'admin', } });
    const hashedPassword = await hash('Admin-12345', 10);
    // Si el usuario no existe, lo creamos
    if (!user) {
      const newUser = this.userRepository.create({
        username: 'admin',
        password: hashedPassword
      });
      await this.userRepository.save(newUser);
    }
  }
}