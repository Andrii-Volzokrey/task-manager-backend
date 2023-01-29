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

@Controller('/api/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createBoard(@User() user: UserType, @Body() payload: CreateBoardDto) {
    return await this.boardService.create(user.id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get/:id')
  async getBoard(@User() user: UserType, @Param('id') boardId: number) {
    return this.boardService.get(user.id, boardId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  async updateBoard(
    @User() user: UserType,
    @Param('id') boardId: number,
    @Body() payload: UpdateBoardDto,
  ) {
    return this.boardService.update(user.id, boardId, payload);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete('/delete/:id')
  async deleteBoard(@User() user: UserType, @Param('id') boardId: number) {
    return this.boardService.delete(user.id, boardId);
  }
}
