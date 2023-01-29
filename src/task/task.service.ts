import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/task/task.entity';
import { Repository } from 'typeorm';
import { ColumnService } from 'src/column/column.service';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly columnService: ColumnService,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getUserTask(userId, taskId) {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoin('task.column', 'column')
      .leftJoin('column.board', 'board')
      .where('task.id = :taskId AND board.user_id = :userId', {
        taskId,
        userId,
      })
      .getOne();

    if (!task) {
      throw new ForbiddenException();
    }

    return task;
  }

  async createTask(userId: number, payload: CreateTaskDto) {
    const column = await this.columnService.getColumn(userId, payload.columnId);
    const task = await this.taskRepository.create({
      ...payload,
      columnId: column.id,
    });

    return this.taskRepository.save(task);
  }

  async getTask(userId: number, taskId: number) {
    return await this.getUserTask(userId, taskId);
  }

  async updateTask(
    userId: number,
    taskId: number,
    newProperties: UpdateTaskDto,
  ) {
    const task = await this.getUserTask(userId, taskId);
    return this.taskRepository.save({ ...newProperties, id: task.id });
  }

  async deleteTask(userId: number, taskId: number) {
    const task = await this.getUserTask(userId, taskId);
    return this.taskRepository.delete({ id: task.id });
  }
}
