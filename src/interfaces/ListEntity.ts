import { CommonEntityInterface, CommonInterface } from './CommonEntity';
import { CardEntityInterface } from './CardEntity';
import { BoardEntityInterface } from './BoardEntity';

export interface ListInterface extends CommonInterface {
  title: string;
  board_id: string;
  card_ids: string[];
}

export interface ListEntityInterface extends CommonEntityInterface {
  title: string;
  board_id: string;
  cards: CardEntityInterface[];
  board: BoardEntityInterface;
  card_ids: string[];
}
