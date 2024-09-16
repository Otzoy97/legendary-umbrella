import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FormItem } from './form-item/entities/form-item.entity';
import { FormItemModule } from './form-item/form-item.module';
import { FormResponseItem } from './form-response-item/entities/form-response-item.entity';
import { FormResponse } from './form-response/entities/form-response.entity';
import { FormResponseModule } from './form-response/form-response.module';
import { Form } from './form/entities/form.entity';
import { FormModule } from './form/form.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

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
      entities: [User, Form, FormItem, FormResponse, FormResponseItem],
      synchronize: true,
      options: {
        trustServerCertificate: true,
        connectTimeout: 1500000
      }
    }),
    UserModule,
    FormModule,
    FormItemModule,
    FormResponseModule,
    AuthModule
  ],
})
export class AppModule { }