import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TransactionType } from '../enum/transaction-type.enum';

@Entity('transaction')
export class Transaction extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  amount: string;

  @Column()
  type: TransactionType;
}
