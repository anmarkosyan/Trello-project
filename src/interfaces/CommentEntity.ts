import { CommonEntityInterface, CommonInterface } from './CommonEntity';
import { CardEntityInterface } from './CardEntity';

export interface CommentInterface extends CommonInterface {
  text: string;
  card_id: string;
}

export interface CommentEntityInterface extends CommonEntityInterface {
  text: string;
  card_id: string;
  card: CardEntityInterface;
}
