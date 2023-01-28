import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

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
}
