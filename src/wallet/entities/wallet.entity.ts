import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('wallet')
@Unique(['userId'])
export class Wallet extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  balance: string;
}
