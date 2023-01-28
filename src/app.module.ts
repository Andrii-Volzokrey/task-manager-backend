import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from 'src/board/board.module';
import { ColumnModule } from 'src/column/column.module';
import { TaskModule } from 'src/task/task.module';
import { UserModule } from 'src/user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BoardEntity } from 'src/board/board.entity';
import { ColumnEntity } from 'src/column/column.entity';
import { TaskEntity } from 'src/task/task.entity';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    BoardModule,
    ColumnModule,
    TaskModule,
    UserModule,
    AuthModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: 'postgres',
        entities: [UserEntity, BoardEntity, ColumnEntity, TaskEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
