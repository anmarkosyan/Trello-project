import { BaseEntity } from 'typeorm';

export interface CommonInterface {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CommonEntityInterface extends BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}
