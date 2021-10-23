import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import {
  BoardEntityInterface,
  CardEntityInterface,
  ListEntityInterface
} from '../interfaces';
import { BoardEntity } from './Board';
import { CardEntity } from './Card';


@Entity('list')
export class ListEntity extends BaseEntity implements ListEntityInterface {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100, nullable: true })
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  board_id: string;

  @ManyToOne(() => BoardEntity, board => board.lists, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'board_id' })
  board: BoardEntityInterface;

  @OneToMany(type => CardEntity, card => card.list_id)
  cards: CardEntityInterface[];

  @Column('varchar', { array: true, default: [] })
  card_ids: string[];
}
