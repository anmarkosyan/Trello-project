import { Entity, OneToMany } from 'typeorm';
import { Common } from './Common';
import { List } from './List';

@Entity('board')
export class Board extends Common {
  @OneToMany(() => List, list => list.board)
  lists: string[];
}
