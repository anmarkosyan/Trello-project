import { Entity,ManyToOne,JoinColumn,OneToMany } from 'typeorm';
import {Common} from './Common';
import {Board} from './Board';
import {Card} from './Card';

@Entity('list')
export class List extends Common{

    @ManyToOne(
		() => Board,
		(board) => board.lists,
		{
			onDelete: 'CASCADE',
		}
	)
	@JoinColumn({
		name: 'board_Id',
	})
	board: Board;

    
    @OneToMany(
		() => Card,
		(card) => card.list
	)
	cards: Card[];

}