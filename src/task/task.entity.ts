import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ColumnEntity } from 'src/column/column.entity';

@Entity('Tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('text')
  description: string;

  @Column('integer', { name: 'column_id' })
  columnId: number;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks)
  @JoinColumn({ name: 'column_id' })
  column: ColumnEntity;
}
