import {Entity, ManyToOne, JoinColumn, Column, OneToMany} from 'typeorm';
import { Common } from './Common';
import { Board } from './Board';
import { Card } from './Card';

// @ts-ignore
@Entity('list')
export class List extends Common {
  @Column()
  board_id: string;

  @ManyToOne(() => Board, board => board.lists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @OneToMany(type => Card, card => card.list_id)
  cards: Card[];

  @Column('varchar', { array: true, default: [] })
  card_ids: string[];
}
