import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/request-user.decorator';
import UserType from 'src/auth/types/user.type';
import { UpdateBoardDto } from 'src/board/dto/update-board.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Board')
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden.' })
@UseGuards(JwtAuthGuard)
@Controller('/api/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @Post('/create')
  async createBoard(@User() user: UserType, @Body() payload: CreateBoardDto) {
    return await this.boardService.create(user.id, payload);
  }

  @ApiOkResponse({ description: 'The record has been successfully fetched.' })
  @Get('/:id')
  async getBoard(@User() user: UserType, @Param('id') boardId: number) {
    return this.boardService.get(user.id, boardId);
  }

  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  @Post('/:id')
  async updateBoard(
    @User() user: UserType,
    @Param('id') boardId: number,
    @Body() payload: UpdateBoardDto,
  ) {
    return this.boardService.update(user.id, boardId, payload);
  }

  @ApiNoContentResponse({
    description: 'The record has been successfully deleted.',
  })
  @HttpCode(204)
  @Delete('/:id')
  async deleteBoard(@User() user: UserType, @Param('id') boardId: number) {
    return await this.boardService.delete(user.id, boardId);
  }
}
