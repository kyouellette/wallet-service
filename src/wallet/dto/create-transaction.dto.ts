import { TransactionType } from '../enum/transaction-type.enum';

export class CreateTransactionDTO {
  userId: string;
  amount: string;
  type: TransactionType;
}
