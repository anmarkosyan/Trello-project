import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Common extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 100 })
  title?: string;

  @Column({
    default: true,
  })
  // eslint-disable-next-line camelcase
  is_active?: boolean;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at?: Date;

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  updated_at?: Date;
}
