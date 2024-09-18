import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FormItem } from './form-item/entities/form-item.entity';
import { FormItemModule } from './form-item/form-item.module';
import { FormResponseItem } from './form-response/entities/form-response-item.entity';
import { FormResponse } from './form-response/entities/form-response.entity';
import { FormResponseModule } from './form-response/form-response.module';
import { Form } from './form/entities/form.entity';
import { FormModule } from './form/form.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Form, FormItem, FormResponse, FormResponseItem],
        synchronize: true,
        options: {
          trustServerCertificate: true,
          connectTimeout: 1500000
        }
      }),
      inject: [ConfigService],
    }),
    FormModule,
    FormItemModule,
    FormResponseModule,
    AuthModule
  ],
})
export class AppModule { }