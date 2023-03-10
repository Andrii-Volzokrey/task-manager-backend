import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from 'src/board/board.entity';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';
import { UpdateBoardDto } from 'src/board/dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  async getUserBoard(userId: number, boardId: number) {
    const board = await this.boardRepository.findOne({
      where: { id: boardId, userId },
    });

    if (!board) {
      throw new ForbiddenException();
    }

    return board;
  }

  async createBoard(userId: number, data: CreateBoardDto) {
    const entity = this.boardRepository.create({ ...data, userId: userId });
    return await this.boardRepository.save(entity);
  }

  async getBoard(userId: number, boardId: number) {
    return await this.getUserBoard(userId, boardId);
  }

  async updateBoard(
    userId: number,
    boardId: number,
    newProperties: UpdateBoardDto,
  ) {
    const board = await this.getUserBoard(userId, boardId);
    return await this.boardRepository.save({ ...newProperties, id: board.id });
  }

  async deleteBoard(userId: number, boardId: number) {
    const board = await this.getUserBoard(userId, boardId);
    return await this.boardRepository.delete({ id: board.id });
  }
}
