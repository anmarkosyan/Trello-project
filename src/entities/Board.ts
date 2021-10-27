import { Entity, Column, OneToMany } from 'typeorm';
import { Common } from './Common';
import { List } from './List';

@Entity('board')
export class Board extends Common {
  @OneToMany(type => List, list => list.board_id)
  lists: List[];

  @Column('varchar', { array: true, default: [] })
  list_ids: string[];
}
