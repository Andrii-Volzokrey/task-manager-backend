import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ColumnModule } from 'src/column/column.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/task/task.entity';

@Module({
  imports: [ColumnModule, TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
