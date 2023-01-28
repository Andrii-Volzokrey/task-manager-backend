import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BoardEntity } from 'src/board/board.entity';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', {})
  password: string;

  @Column('varchar', { name: 'first_name' })
  firstName: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @OneToMany(() => BoardEntity, (board) => board.user)
  boards: BoardEntity[];
}
