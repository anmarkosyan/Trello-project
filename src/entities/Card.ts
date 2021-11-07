import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ListEntity } from './List';
import { CardEntityInterface, CommentEntityInterface } from '../interfaces';
import { CommentEntity } from './Comment';

@Entity('card')
export class CardEntity extends BaseEntity implements CardEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('varchar', { length: 200, default: '' })
  description: string;

  @Column()
  list_id: string;

  @ManyToOne(() => ListEntity, list => list.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'list_id',
  })
  list: ListEntity;

  @OneToMany(
    (type: CommentEntityInterface) => CommentEntity,
    comment => comment.card
  )
  comments: CommentEntityInterface[];
}
