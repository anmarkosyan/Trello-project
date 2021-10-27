import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Common } from './Common';
import { Card } from './Card';

@Entity('comment')
export class Comment extends Common {
  @Column('varchar', { length: 1000 })
  text: string;

  @Column()
  card_id: string;

  @ManyToOne(() => Card, card => card.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'card_id',
  })
  cards: Card;
}
