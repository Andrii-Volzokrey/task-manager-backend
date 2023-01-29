import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/request-user.decorator';
import UserType from 'src/auth/types/user.type';
import { CreateColumnDto } from 'src/column/dto/create-column.dto';
import { UpdateColumnDto } from 'src/column/dto/update-column.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden.' })
@UseGuards(JwtAuthGuard)
@Controller('/api/column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @Post('/create')
  async createColumn(@User() user: UserType, @Body() payload: CreateColumnDto) {
    return await this.columnService.createColumn(user.id, payload);
  }

  @ApiOkResponse({ description: 'The record has been successfully fetched.' })
  @Get('/:id')
  async getColumn(@User() user: UserType, @Param('id') columnId: number) {
    return await this.columnService.getColumn(user.id, columnId);
  }

  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  @Patch('/:id')
  async updateColumn(
    @User() user: UserType,
    @Param('id') columnId: number,
    @Body() payload: UpdateColumnDto,
  ) {
    return await this.columnService.updateColumn(user.id, columnId, payload);
  }

  @ApiNoContentResponse({
    description: 'The record has been successfully deleted.',
  })
  @HttpCode(204)
  @Delete('/:id')
  async deleteColumn(@User() user: UserType, @Param('id') columnId: number) {
    return this.columnService.deleteColumn(user.id, columnId);
  }
}
