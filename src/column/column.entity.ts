import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;
}
