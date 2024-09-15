import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { FormModule } from './form/form.module';
import { FormResponseModule } from './form-response/form-response.module';
import { FormItemModule } from './form-item/form-item.module';
import { FormResponseItemModule } from './form-response-item/form-response-item.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
      options: {
        trustServerCertificate: true
      }
    }),
    UserModule,
    FormModule, 
    FormItemModule, 
    FormResponseModule, 
    FormResponseItemModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }