
import { Entity,ManyToOne,JoinColumn,OneToMany, Column } from 'typeorm';
import {Common} from './Common';
import {Board} from './Board';
import {Card} from './Card';

@Entity('list')
export class List extends Common{
    @Column()
    boardId:string;
    @ManyToOne(
		() => Board,
		(board) => board.lists,
		{
			onDelete: 'CASCADE',
		}
	)

	@JoinColumn({name:"boardId"})
	board: Board;

    
    // @OneToMany(
	// 	() => Card,
	// 	(card) => card.list
	// )
	// cards: Card[];

	@Column('varchar', { array: true, nullable: true })
	cards: string[];
  
}