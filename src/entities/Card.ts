import { Entity,ManyToOne,JoinColumn,Column,OneToMany } from 'typeorm';
import {Common} from './utils/Common';
import {List} from './List';
import {Comment} from './Comment'

@Entity('card')
export class Card extends Common{

    @Column('varchar', { length: 200 })
    description: string;

    @ManyToOne(
		() => List,
		(list) => list.cards,
		{
			onDelete: 'CASCADE',
		}
	)
	@JoinColumn({
		name: 'list_id',
	})
	list: List;

    @OneToMany(
		() => Comment,
		(comment) => comment.card
	)
	comments: Comment[];

}