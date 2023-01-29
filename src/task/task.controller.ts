import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/request-user.decorator';
import UserType from 'src/auth/types/user.type';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';

@ApiTags('Task')
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden.' })
@UseGuards(JwtAuthGuard)
@Controller('/api/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @Post('/create')
  async createTask(@User() user: UserType, @Body() payload: CreateTaskDto) {
    return await this.taskService.createTask(user.id, payload);
  }

  @ApiOkResponse({ description: 'The record has been successfully fetched.' })
  @Get('/:id')
  async getTask(@User() user: UserType, @Param('id') taskId: number) {
    return await this.taskService.getTask(user.id, taskId);
  }

  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  @Patch('/:id')
  async updateTask(
    @User() user: UserType,
    @Param('id') taskId: number,
    payload: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(user.id, taskId, payload);
  }

  @ApiNoContentResponse({
    description: 'The record has been successfully deleted.',
  })
  @Delete('/:id')
  async deleteTask(@User() user: UserType, @Param('id') taskId: number) {
    return this.taskService.deleteTask(user.id, taskId);
  }
}
