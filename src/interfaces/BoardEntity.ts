import { CommonEntityInterface, CommonInterface } from './CommonEntity';
import { ListEntityInterface } from './ListEntity';

export interface BoardInterface extends CommonInterface {
  title: string;
  list_ids: string[];
}

export interface BoardEntityInterface extends CommonEntityInterface {
  title: string;
  list_ids: string[];
  lists: ListEntityInterface[];
}
