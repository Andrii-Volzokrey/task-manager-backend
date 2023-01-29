import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardEntity } from 'src/board/board.entity';
import { TaskEntity } from 'src/task/task.entity';

@Entity('Columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('integer', { name: 'board_id' })
  boardId: number;

  @ManyToOne(() => BoardEntity, (board) => board.columns)
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity;

  @OneToMany(() => TaskEntity, (task) => task.column)
  tasks: TaskEntity[];
}
