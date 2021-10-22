import { Entity, ManyToOne, JoinColumn, Column, OneToMany } from 'typeorm';
import { Common } from './Common';
import { List } from './List';
import { Comment } from './Comment';

@Entity('card')
export class Card extends Common {
  @Column('varchar', { length: 200, nullable: true })
  description: string;

  @Column()
  list_id: string;

  @ManyToOne(() => List, list => list.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'list_id',
  })
  list: List;

  @OneToMany((type: Comment) => Comment, comment => comment.cards)
  comments: Comment[];
}
