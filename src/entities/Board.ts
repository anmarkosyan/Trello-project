import { Entity, Column } from 'typeorm';
import { Common } from './Common';

@Entity('board')
export class Board extends Common {
  @Column('varchar', { array: true, nullable: true })
  lists: string[];
}
