import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { CardEntity } from './Card';
import { CardEntityInterface, CommentEntityInterface } from '../interfaces';

@Entity('comment')
export class CommentEntity extends BaseEntity implements CommentEntityInterface {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100, nullable: true })
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('varchar', { length: 1000 })
  text: string;

  @Column()
  card_id: string;

  @ManyToOne(() => CardEntity, card => card.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'card_id',
  })
  card: CardEntityInterface;
}
