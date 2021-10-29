import { CommonEntityInterface, CommonInterface } from './CommonEntity';
import { ListEntityInterface } from './ListEntity';
import { CommentEntityInterface } from './CommentEntity';

export interface CardInterface extends CommonInterface {
  title: string;
  list_id: string;
  description?: string;
}

export interface CardEntityInterface extends CommonEntityInterface {
  title: string;
  list_id: string;
  list: ListEntityInterface;
  comments: CommentEntityInterface[];
  description: string;
}
