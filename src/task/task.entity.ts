import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('text')
  description: string;
}
