import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Common } from './Common';
import { List } from './List';

@Entity('card')
export class Card extends Common {
  @Column('varchar', { length: 200, nullable: true })
  description: string;

  @ManyToOne(() => List, list => list.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'list_id',
  })
  list: List;

  // @Column('varchar', { array: true, nullable: true })
  // comments: string[];
}
