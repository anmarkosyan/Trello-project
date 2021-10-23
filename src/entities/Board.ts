import {
  Entity,
  Column,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { ListEntity } from './List';
import { BoardEntityInterface, ListEntityInterface } from '../interfaces';

@Entity('board')
export class BoardEntity extends BaseEntity implements BoardEntityInterface {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100, nullable: true })
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(type => ListEntity, list => list.board_id)
  lists: ListEntityInterface[];

  @Column('varchar', { array: true, default: [] })
  list_ids: string[];
}
