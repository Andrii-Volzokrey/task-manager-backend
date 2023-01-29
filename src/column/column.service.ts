import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { CreateColumnDto } from 'src/column/dto/create-column.dto';
import { BoardService } from 'src/board/board.service';
import { UpdateColumnDto } from 'src/column/dto/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(
    private readonly boardService: BoardService,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}

  async getUserColumn(userId: number, columnId: number) {
    const column = await this.columnRepository
      .createQueryBuilder('column')
      .leftJoin('column.board', 'board')
      .where(`column.id = :columnId AND board.user_id = :userId`, {
        columnId,
        userId,
      })
      .getOne();

    if (!column) {
      throw new ForbiddenException();
    }

    return column;
  }

  async createColumn(userId: number, payload: CreateColumnDto) {
    const board = await this.boardService.getUserBoard(userId, payload.boardId);
    const column = this.columnRepository.create({
      ...payload,
      boardId: board.id,
    });

    return this.columnRepository.save(column);
  }

  async getColumn(userId: number, columnId: number) {
    return await this.getUserColumn(userId, columnId);
  }

  async updateColumn(
    userId: number,
    columnId: number,
    newProperties: UpdateColumnDto,
  ) {
    const column = await this.getUserColumn(userId, columnId);
    return await this.columnRepository.save({
      ...newProperties,
      id: column.id,
    });
  }

  async deleteColumn(userId: number, columnId: number) {
    const column = await this.getUserColumn(userId, columnId);
    return this.columnRepository.delete({ id: column.id });
  }
}
