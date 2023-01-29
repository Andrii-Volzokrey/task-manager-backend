import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { ColumnEntity } from 'src/column/column.entity';

@Entity('Boards')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('integer', { name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.boards)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => ColumnEntity, (column) => column.board)
  columns: ColumnEntity[];
}
