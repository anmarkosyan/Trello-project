
import { Entity,ManyToOne,JoinColumn,Column } from 'typeorm';
import {Common} from './Common';
import {Board} from './Board';


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

	@Column('varchar', { array: true, default:[] })
	cards: string[];
  
}